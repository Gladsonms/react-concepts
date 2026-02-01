/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import type { GanttChartProps } from "./types";

export default function GanttChart({
  tasks,
  config,
  onInit,
  onDestroy,
  height = 500,
  resources,
}: GanttChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentTimeMarkerId = useRef<string | number | null>(null);

  useEffect(() => {
    if (config) {
      Object.assign(gantt.config, config);
    }

    // Standard Requirements
    gantt.config.open_split_tasks = false;
    gantt.plugins({ marker: true });

    // Only display parent tasks in the grid/chart
    gantt.templates.task_display = (task: any) => {
      // Only show tasks that don't have a parent (i.e., only parent tasks)
      return !task.parent;
    };

    // --- SUBTASK INJECTION LOGIC ---
    gantt.templates.task_text = (start: Date, end: Date, task: any) => {
      if (gantt.hasChild(task.id)) {
        const sub_tasks = gantt.getChildren(task.id);
        const now = new Date();
        const html_subtasks = [];

        for (let i = 0; i < sub_tasks.length; i++) {
          const child = gantt.getTask(sub_tasks[i]);
          const child_sizes = gantt.getTaskPosition(child);
          const parent_sizes = gantt.getTaskPosition(task);
          
          const left_pos = child_sizes.left - parent_sizes.left;
          
          // Color Logic: Past = Green, Future = Gold
          const statusClass = new Date(child.start_date) < now 
            ? "subtask_past_green" 
            : "subtask_upcoming_gold";

          html_subtasks.push(`
            <span class="subtask_inline_bar ${statusClass}" 
                  style="left: ${left_pos}px; width: ${child_sizes.width}px;"
                  data-task-id="${child.id}">
              ${child.text}
            </span>`);
        }
        return html_subtasks.join("");
      }
      return task.text;
    };

    // --- COLOR LOGIC FOR PARENT BARS ---
    gantt.templates.task_class = (start: Date, end: Date, task: any) => {
      // If it's a technician row (has children), make it transparent container
      if (gantt.hasChild(task.id)) {
        return "technician_parent_row";
      }
      return "";
    };

    // Enable drag and drop for subtasks
    gantt.attachEvent("onBeforeTaskDrag", (id: any, mode: any, e: any) => {
      const target = e.target || e.srcElement;
      
      // Check if clicking on a subtask inline bar
      if (target.classList.contains("subtask_inline_bar")) {
        const taskId = target.getAttribute("data-task-id");
        if (taskId) {
          // Store the actual child task id for dragging
          gantt._drag_id = taskId;
          return true;
        }
      }
      
      // Allow dragging of parent tasks
      const task = gantt.getTask(id);
      return !task.parent; // Only allow parent tasks to be dragged directly
    });

    // Handle subtask repositioning
    gantt.attachEvent("onAfterTaskDrag", (id: any, mode: any, e: any) => {
      const task = gantt.getTask(id);
      
      // If a child task was moved, update the parent's timeline if needed
      if (task.parent) {
        const parent = gantt.getTask(task.parent);
        const siblings = gantt.getChildren(task.parent);
        
        let minStart: Date | null = null;
        let maxEnd: Date | null = null;
        
        siblings.forEach((childId: any) => {
          const child = gantt.getTask(childId);
          if (!minStart || child.start_date < minStart) {
            minStart = child.start_date;
          }
          if (!maxEnd || child.end_date > maxEnd) {
            maxEnd = child.end_date;
          }
        });
        
        if (minStart && maxEnd) {
          parent.start_date = minStart;
          parent.end_date = maxEnd;
          gantt.updateTask(parent.id);
        }
      }
      
      gantt.render();
    });

    if (containerRef.current) {
      gantt.init(containerRef.current);
    }

    onInit?.(gantt);

    return () => {
      onDestroy?.(gantt);
      gantt.clearAll();
    };
  }, []);

  useEffect(() => {
    gantt.clearAll();
    gantt.parse({ data: tasks, links: [] });
  }, [tasks]);

  return <div ref={containerRef} style={{ width: "100%", height }} />;
}
