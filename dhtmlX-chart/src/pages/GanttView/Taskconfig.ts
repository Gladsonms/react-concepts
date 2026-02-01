import type { GanttTask } from "../../components/AiScheduler/GanttChart";

export const data = [
  {
    jobId: 1123,
    name: "Beck, andrew",
    wireCenter: "Abbeville AL",
  },
];









export const tasks: GanttTask[] = [
  // TECHNICIAN 1: Andrew Becker
  {
    id: "u1",
    text: "Becker, Andrew",
    type: "project",
    render: "split",
    open: true,
  },
  { id: 101, parent: "u1", text: "TRIL000126", start_date: "2026-01-30 09:00", end_date: "2026-01-30 11:30" },
  { id: 102, parent: "u1", text: "JOB-442", start_date: "2026-01-30 13:00", end_date: "2026-01-30 15:00" },

  // TECHNICIAN 2: Thomas Buss
  {
    id: "u2",
    text: "Buss, Thomas",
    type: "project",
    render: "split",
    open: true,
  },
  { id: 201, parent: "u2", text: "DSLID013", start_date: "2026-01-30 08:30", end_date: "2026-01-30 10:00" },
  { id: 202, parent: "u2", text: "DSL0013", start_date: "2026-01-30 10:30", end_date: "2026-01-30 13:00" },
  { id: 203, parent: "u2", text: "TRIL000196", start_date: "2026-01-30 13:30", end_date: "2026-01-30 16:00" },

  // TECHNICIAN 3: Greg Clark
  {
    id: "u3",
    text: "Clark, Greg",
    type: "project",
    render: "split",
    open: true,
  },
  { id: 301, parent: "u3", text: "DSLL00333", start_date: "2026-01-30 11:00", end_date: "2026-01-30 13:30" },
  { id: 302, parent: "u3", text: "TRIL000126", start_date: "2026-01-30 14:00", end_date: "2026-01-30 17:00" },
];

export const resources = [
  { id: "u1", text: "Becker, Andrew" },
  { id: "u2", text: "Buss, Thomas" },
  { id: "u3", text: "Clark, Greg" },
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
    dueDate: "01/30/2026",
  },
  {
    id: "unscheduled2",
    jobId: "DSLID1002",
    referenceNo: "MRL0253354002",
    city: "Galesburg IL",
    address: "2570 Hathaway St",
    taskType: "CORRHGENERAL",
    duration: "2 hr",
    priority: "Normal",
    dueDate: "01/31/2026",
  },
];