import { useMemo, useState, useRef, useEffect } from 'react';
import ReactGantt, { type Task, type Link } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
import { generateDummyData, yellowThemeConfig } from './config';
import './GanttChart.css';

interface GanttChartProps {
  numberOfProjects?: number;
  numberOfTasksPerProject?: number;
}

const GanttChart = ({ 
  numberOfProjects = 5, 
  numberOfTasksPerProject = 3 
}: GanttChartProps) => {
  // Generate tasks and links using config
  const generatedData = useMemo(() => {
    return generateDummyData({
      numberOfProjects,
      numberOfTasksPerProject,
      startDate: yellowThemeConfig.startDate,
      endDate: yellowThemeConfig.endDate,
    });
  }, [numberOfProjects, numberOfTasksPerProject]);

  const [tasks, setTasks] = useState<Task[]>(() => generatedData.tasks);
  const [links, setLinks] = useState<Link[]>(() => generatedData.links);
  const dataKeyRef = useRef(`${numberOfProjects}-${numberOfTasksPerProject}`);

  // Update tasks and links when props change
  useEffect(() => {
    const currentKey = `${numberOfProjects}-${numberOfTasksPerProject}`;
    if (dataKeyRef.current !== currentKey) {
      dataKeyRef.current = currentKey;
      // Use setTimeout to avoid synchronous state updates in effect
      setTimeout(() => {
        setTasks([...generatedData.tasks]);
        setLinks([...generatedData.links]);
      }, 0);
    }
  }, [numberOfProjects, numberOfTasksPerProject, generatedData]);

  const data = useMemo(
    () => ({
      save: (entity: string, action: string, item: Task | Link, id: string | number) => {
        if (entity === 'task') {
          setTasks((prev) => {
            if (action === 'create') return [...prev, item as Task];
            if (action === 'update') return prev.map((task) =>
              task.id === id ? (item as Task) : task
            );
            if (action === 'delete') return prev.filter((task) => task.id !== id);
            return prev;
          });
        }

        if (entity === 'link') {
          setLinks((prev) => {
            if (action === 'create') return [...prev, item as Link];
            if (action === 'update') return prev.map((link) =>
              link.id === id ? (item as Link) : link
            );
            if (action === 'delete') return prev.filter((link) => link.id !== id);
            return prev;
          });
        }
      },
    }),
    []
  );

  return (
    <div className="gantt-container">
      <ReactGantt
        tasks={tasks}
        links={links}
        data={data}
      />
    </div>
  );
};

export default GanttChart;
