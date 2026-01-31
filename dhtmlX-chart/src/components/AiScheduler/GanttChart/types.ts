import { gantt } from "dhtmlx-gantt";

export interface GanttTask {
  id: string | number;         // DHTMLX requires 'id'
  text: string;               // DHTMLX requires 'text' for the label
  start_date?: string | Date; // DHTMLX requires 'start_date'
  end_date?: string | Date;   // DHTMLX requires 'end_date'
  parent?: string | number;   // Links Job to Person
  type?: string;              // 'project' for Person, 'task' for Job
  open?: boolean;
  // Your Custom Fields
  jobId?: number;
  wireCenter?: string;
  city?: string;
  address?: string;
  priority?: string;
  render?: string;
  [key: string]: any;
}

export interface GanttData {
  data: GanttTask[];
}

export interface GanttConfig {
  grid_width?: number;
  scale_height?: number;
  scales?: { unit: string; step?: number; date?: string }[];
  start_date?: Date;
  end_date?: Date;
  smart_rendering?: boolean;
  static_background?: boolean;
  readonly?: boolean;
  show_progress?: boolean;
  drag_links?: boolean;
  drag_move?: boolean;
  drag_progress?: boolean;
  details_on_dblclick?: boolean;
  show_tasks_outside_timescale?: boolean;
  preserve_scroll?: boolean;
  min_column_width?: number;
  row_height?: number;
  bar_height?: number;
  [key: string]: unknown;
}

export interface GanttChartProps {
  tasks: GanttTask[];
  assignments?: any;
  resources?: any;
  /** Optional gantt.config overrides */
  config?: GanttConfig;
  /** Optional init hook */
  onInit?: (ganttInstance: typeof gantt) => void;
  /** Optional cleanup hook */
  onDestroy?: (ganttInstance: typeof gantt) => void;
  height?: string | number;
}
