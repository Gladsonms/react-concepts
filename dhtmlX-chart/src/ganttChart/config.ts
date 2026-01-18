import type { Task, Link } from '@dhtmlx/trial-react-gantt';

export interface GanttConfig {
  startDate: Date;
  endDate: Date;
  theme: {
    taskColor: string;
    taskProgressColor: string;
    taskSelectedColor: string;
    linkColor: string;
    gridColor: string;
  };
}

export const yellowThemeConfig: GanttConfig = {
  startDate: new Date(2025, 0, 1), // 1-1-2025
  endDate: new Date(2025, 11, 31), // 31-12-2025
  theme: {
    taskColor: '#FFD700', // Gold/Yellow
    taskProgressColor: '#FFA500', // Orange-Yellow for progress
    taskSelectedColor: '#FFC107', // Amber for selected
    linkColor: '#FFD700',
    gridColor: '#FFD700',
  },
};

export interface GenerateDataOptions {
  numberOfProjects: number;
  numberOfTasksPerProject?: number;
  startDate?: Date;
  endDate?: Date;
}

// Helper function to add days to a date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Helper function to get random number between min and max
const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get random progress
const randomProgress = (min: number, max: number): number => {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
};

export const generateDummyData = (
  options: GenerateDataOptions
): { tasks: Task[]; links: Link[] } => {
  const {
    numberOfProjects,
    numberOfTasksPerProject = 3,
    startDate = new Date(2025, 0, 1),
    endDate = new Date(2025, 11, 31),
  } = options;

  const tasks: Task[] = [];
  const links: Link[] = [];
  let taskId = 1;
  let linkId = 1;

  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate optimal project duration to fit all projects
  // Ensure minimum duration for tasks to fit properly
  const minTaskDuration = 1; // Minimum 1 day per task
  const minProjectDuration = Math.max(1, numberOfTasksPerProject * minTaskDuration);
  
  // Calculate spacing between projects (minimal to fit more projects)
  // Use very small spacing to maximize project count
  const spacingBetweenProjects = 0; // No spacing to maximize project count
  
  // Calculate required days for all projects
  const requiredDaysForProjects = numberOfProjects * minProjectDuration + (numberOfProjects - 1) * spacingBetweenProjects;
  
  // Always extend the end date to ensure all projects fit
  // This ensures we never run out of space
  let adjustedEndDate = new Date(endDate);
  if (requiredDaysForProjects > totalDays) {
    // Extend end date to accommodate all projects with some buffer
    const additionalDays = requiredDaysForProjects - totalDays + 100; // Add buffer
    adjustedEndDate = addDays(endDate, additionalDays);
  }
  
  const adjustedTotalDays = Math.floor((adjustedEndDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate max project duration - ensure it's at least minProjectDuration
  const maxProjectDuration = Math.max(
    minProjectDuration,
    Math.floor((adjustedTotalDays - (numberOfProjects * spacingBetweenProjects)) / numberOfProjects)
  );

  let currentDate = new Date(startDate);
  let actualEndDate = new Date(adjustedEndDate);

  // Generate ALL projects - guaranteed to create exactly numberOfProjects
  for (let i = 0; i < numberOfProjects; i++) {
    // Main project
    const projectId = taskId;
    
    // Ensure project duration is sufficient for all tasks
    // Each task needs at least 1 day, so project needs at least numberOfTasksPerProject days
    const requiredProjectDuration = Math.max(minProjectDuration, numberOfTasksPerProject);
    const projectDuration = Math.max(
      requiredProjectDuration,
      randomBetween(requiredProjectDuration, Math.max(requiredProjectDuration, maxProjectDuration))
    );
    
    const projectEndDate = addDays(currentDate, projectDuration);
    
    // Track the actual end date for dynamic scaling
    if (projectEndDate > actualEndDate) {
      actualEndDate = new Date(projectEndDate);
    }

    tasks.push({
      id: projectId,
      text: `Project ${i + 1}`,
      type: 'project',
      open: true,
      parent: 0,
      start_date: currentDate,
      duration: projectDuration,
      progress: randomProgress(0, 0.5),
    } as Task);

    taskId++;

    // Create ALL tasks for this project - guaranteed to create exactly numberOfTasksPerProject
    const tasksPerProject = numberOfTasksPerProject;
    
    // Ensure project duration is at least equal to number of tasks (each task gets at least 1 day)
    // If project duration is less than tasksPerProject, extend it
    const actualProjectDuration = Math.max(projectDuration, tasksPerProject);
    const actualProjectEndDate = addDays(currentDate, actualProjectDuration);
    
    // Update project duration if we extended it
    if (actualProjectDuration > projectDuration) {
      const projectTask = tasks.find(t => t.id === projectId);
      if (projectTask) {
        projectTask.duration = actualProjectDuration;
      }
    }
    
    // Calculate task duration - distribute evenly
    const taskDuration = Math.max(1, Math.floor(actualProjectDuration / tasksPerProject));
    let taskStartDate = new Date(currentDate);
    let previousTaskId: number | null = null;

    // Generate ALL tasks - never break early
    for (let j = 0; j < tasksPerProject; j++) {
      const isLastTask = j === tasksPerProject - 1;
      
      // Calculate task duration
      let taskDur: number;
      if (isLastTask) {
        // Last task takes ALL remaining time to ensure we use the full project duration
        const remainingTime = Math.floor((actualProjectEndDate.getTime() - taskStartDate.getTime()) / (1000 * 60 * 60 * 24));
        taskDur = Math.max(1, remainingTime);
      } else {
        // Use calculated duration
        taskDur = Math.max(1, taskDuration);
      }

      // Always create the task - guaranteed to create all tasks
      const taskIdCurrent = taskId;
      tasks.push({
        id: taskIdCurrent,
        text: `Task ${i + 1}.${j + 1}`,
        type: 'task',
        progress: randomProgress(0, 1),
        start_date: taskStartDate,
        duration: taskDur,
        parent: projectId,
      } as Task);

      // Create link from previous task
      if (previousTaskId !== null) {
        links.push({
          id: linkId++,
          source: previousTaskId,
          target: taskIdCurrent,
          type: '0',
        } as Link);
      }

      previousTaskId = taskIdCurrent;
      taskStartDate = addDays(taskStartDate, taskDur);
      taskId++;
    }

    // Add milestone at the end of project
    const milestoneId = taskId;
    tasks.push({
      id: milestoneId,
      text: `Milestone ${i + 1}`,
      type: 'milestone',
      progress: 0,
      start_date: projectEndDate,
      duration: 0,
      parent: projectId,
    } as Task);

    // Link last task to milestone
    if (previousTaskId !== null) {
      links.push({
        id: linkId++,
        source: previousTaskId,
        target: milestoneId,
        type: '0',
      } as Link);
    }

    taskId++;
    
    // Move to next project with minimal spacing
    currentDate = addDays(projectEndDate, spacingBetweenProjects);
    
    // Never break - continue to generate all projects
  }

  // Verify we generated the correct number of projects
  const projectCount = tasks.filter(t => t.type === 'project').length;
  const taskCount = tasks.filter(t => t.type === 'task').length;
  
  console.log(`Generated ${projectCount} projects (requested: ${numberOfProjects})`);
  console.log(`Generated ${taskCount} tasks (requested: ${numberOfProjects * numberOfTasksPerProject})`);

  return { tasks, links };
};
