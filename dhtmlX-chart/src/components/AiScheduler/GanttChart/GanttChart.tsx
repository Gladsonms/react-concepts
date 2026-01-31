/* eslint-disable @typescript-eslint/no-explicit-any */
// Reusable component
import { useEffect, useRef } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import type { GanttChartProps } from "./types";
import "./GanttChart.css";

export default function GanttChart({
  tasks,
  config,
  onInit,
  onDestroy,
  height = 500,
}: GanttChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const transformTasks = (taskList: any[], startDate: Date, endDate: Date) => {
    const tasksByTechnician: { [key: string]: any } = {};
    const displayTasks: any[] = [];
    let rowIndex = 0;

    taskList.forEach((task) => {
      const technician = (task as any).technician || task.text;
      
      if (!tasksByTechnician[technician]) {
        // Create parent row for technician with split rendering
        tasksByTechnician[technician] = {
          id: `tech_${rowIndex}`,
          text: technician,
          type: "project",
          render: "split",  // Enable split rendering for this task
          start_date: startDate,
          end_date: endDate,
          open: true,
        };
        displayTasks.push(tasksByTechnician[technician]);
        rowIndex++;
      }

      // Add job as a child of technician
      displayTasks.push({
        ...task,
        parent: tasksByTechnician[technician].id,
      });
    });

    return displayTasks;
  };

  useEffect(() => {
    if (config) {
      Object.assign(gantt.config, config);
    }

    if (containerRef.current) {
      gantt.init(containerRef.current);
      
      const startDate = config?.start_date || new Date(2024, 3, 24, 8, 0);
      const endDate = config?.end_date || new Date(2024, 3, 24, 17, 0);
      const displayTasks = transformTasks(tasks, startDate, endDate);

      gantt.parse({ data: displayTasks });
    }

    onInit?.(gantt);

    return () => {
      onDestroy?.(gantt);
      gantt.clearAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    gantt.clearAll();
    
    const startDate = config?.start_date || new Date(2024, 3, 24, 8, 0);
    const endDate = config?.end_date || new Date(2024, 3, 24, 17, 0);
    const displayTasks = transformTasks(tasks, startDate, endDate);

    gantt.parse({ data: displayTasks });
  }, [tasks]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height }}
    />
  );
}
