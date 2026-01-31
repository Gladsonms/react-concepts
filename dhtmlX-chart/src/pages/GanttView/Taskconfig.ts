import type { GanttTask } from "../../components/AiScheduler/GanttChart";


export const tasks: GanttTask[] = [
  // THE PERSON (The Container Row)
  {
    id: "u1123",
    text: "Beck, Andrew",
    wireCenter: "Abbeville AL",
    type: "project",    // Required for split rendering
    render: "split",    // This pulls children into this row
    open: true,         // Must be true to see the children
  },
  // THE JOBS (Will appear inside Andrew's row)
  {
    id: 1,
    jobId: 1,
    parent: "u1123",
    text: "Sarah Jenkins",
    start_date: "2025-01-06 00:00",
    end_date: "2025-01-08 00:00",
  },
  {
    id: 2,
    jobId: 2,
    parent: "u1123",
    text: "Michael Chen",
    start_date: "2025-01-11 00:00",
    end_date: "2025-01-13 00:00",
  },
];

export const data = [
  {
    jobId: 1123,
    name: "Beck, andrew",
    wireCenter: "Abbeville AL",
  },
];

export const resources = [
  { id: 1, text: "John", unit: "hours/day" },
  { id: 7, text: "Mike", unit: "hours/day" },
  { id: 8, text: "Anna", unit: "hours/day" },
  { id: 9, text: "Bill", unit: "hours/day" },
  { id: 10, text: "Floe", unit: "hours/day" },
];

export const assignments = [
  {
    id: "a1",
    task_id: "t1_1", // Links to Part A
    resource_id: "6",
    value: 3,
    start_date: "2026-04-03 00:00",
    end_date: "2026-04-05 00:00",
  },
];


export const unscheduledJobs = [
  {
    id: "unscheduled1",
    jobId: "DSLID1015",
    referenceNo: "MRL0253354001",
    city: "Galesburg IL",
    address: "2570 Hathaway St",
    taskType: "DSL5001AS/",
    duration: "2 hr",
    priority: "Normal",
    dueDate: "04/24/2024",
  },
  {
    id: "unscheduled2",
    jobId: "DSLID1002",
    referenceNo: "MRL0253354001",
    city: "Galesburg IL",
    address: "2570 Hathaway St",
    taskType: "CORRHGENERAL",
    duration: "2 hr",
    priority: "Normal",
    dueDate: "04/24/2024",
  },
];
