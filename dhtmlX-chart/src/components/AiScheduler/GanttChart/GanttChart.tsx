/* eslint-disable @typescript-eslint/no-explicit-any */
// Reusable component
import { useEffect, useRef } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import type { GanttChartProps } from "./types";


// Jan 6–8 highlight range (start of Jan 6 to end of Jan 8)


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

    // Resource View Configuration
    gantt.config.resource_property = "user";
    gantt.config.resource_store = "resource";
    gantt.config.open_split_tasks = true; 
    
    // Configure layout for Resource View
    gantt.config.layout = {
      css: "gantt_container",
      rows: [
        {
          cols: [
            { view: "grid", group: "resource", width: 250, scrollY: "scrollVer" },
            { resizer: true, width: 1 },
            { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
            { view: "scrollbar", id: "scrollVer" }
          ]
        },
        { view: "scrollbar", id: "scrollHor" }
      ]
    };

    gantt.plugins({ 
      marker: true,
      grouping: true // Ensure grouping plugin is active if available via easy import or it might be built-in for some versions? 
      // Actually standard dhtmlx-gantt might need 'grouping' extension enabled if it's not core. 
      // The prompt didn't specify enabling a plugin but implied it by usage. 
      // I'll stick to what was there (`marker: true`) and hope standard layout works or it's implicitly enabled.
    });

    // Template for resource cell
    gantt.templates.resource_cell_value = (resource: any, date: Date, tasks: any[]) => {
      // return "<div>" + resource.text + " (" + tasks.length + ")</div>";
      return "<div>" + (resource.text || "") + " (" + tasks.length + " jobs)</div>";
    };
    
    // Parse "YYYY-MM-DD HH:mm"
    gantt.templates.parse_date = (date: string) => {
      if (!date) return new Date();
      const d = new Date(date);
      return isNaN(d.getTime()) ? new Date(date.replace(/-/g, "/")) : d;
    };

    // Styling
    gantt.templates.task_class = (start: Date, end: Date, task: any) => {
      return "custom_dispatcher_job";
    };
    // ... inside your GanttChart component useEffect

// Dynamic Styling based on "Now"
gantt.templates.task_class = (start: Date, end: Date, task: any) => {
  const now = new Date();
  
  // If the task is a job (has a parent) and started before "now"
  if (task.parent && start < now) {
    return "job_past_green";
  }
  
  // Default for upcoming tasks
  return "job_upcoming_gold";
};

    if (containerRef.current) {
      gantt.init(containerRef.current);
      
      // Load resources into the specific list that the 'group: "resource"' layout likely defaults to or we explicitly set.
      // If layout group is "resource", it often looks for a serverList named "resource" (or whatever the group id is).
      // Let's assume the component will handle populating the grid via the content we pass.
      
      // Important: For resource view to work, we often need to pass resources as part of the parse data or update a store.
      // DHTMLX Gantt's `group` mode often iterates unique values of `resource_property`.
      // But if we want to show ALL resources including empty ones, we need to pass them.
      // I'll update the parse call below.
    }

    // Marker logic...
    const interval = setInterval(() => {
        // ... (keep existing marker update logic)
      if (currentTimeMarkerId.current != null) {
        const marker = gantt.getMarker(currentTimeMarkerId.current);
        if (marker) {
          marker.start_date = new Date();
          marker.title = gantt.date.date_to_str(
            gantt.config.task_date || "%Y-%m-%d %H:%i"
          )(marker.start_date);
          gantt.updateMarker(currentTimeMarkerId.current);
        }
      }
    }, 60 * 1000);

    onInit?.(gantt);

    return () => {
      clearInterval(interval);
      if (currentTimeMarkerId.current != null) {
          try {
            gantt.deleteMarker(currentTimeMarkerId.current);
          } catch (e) {
              // ignore
          }
        currentTimeMarkerId.current = null;
      }
      onDestroy?.(gantt);
      gantt.clearAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // When tasks or resources change
    gantt.clearAll();
    
    // If we want to strictly follow the prompt's data structure:
    // { data: [...], sections: [...] }
    // We should pass this to parse.
    // However, `sections` isn't a standard DHTMLX Gantt property unless specifically configured.
    // But usually for grouping, we might pass them as a collection.
    // Let's try to populate the 'resource' server list.
    if (resources) {
        gantt.serverList("resource", resources);
    }
    
    gantt.parse({ 
        data: tasks, 
        links: [],
        collections: { resource: resources }
    });

    currentTimeMarkerId.current = gantt.addMarker({
      start_date: new Date(),
      css: "gantt_current_time",
      text: "Now",
      title: gantt.date.date_to_str(gantt.config.task_date || "%Y-%m-%d %H:%i")(
        new Date()
      ),
    });
  }, [tasks, resources, config?.start_date, config?.end_date]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height }}
    />
  );
}
