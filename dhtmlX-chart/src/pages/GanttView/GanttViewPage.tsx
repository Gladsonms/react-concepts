import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import GanttChart from "../../components/AiScheduler/GanttChart/GanttChart";
import { tasks, resources, unscheduledJobs } from "./Taskconfig";
import "./GanttView.css";

type ScaleOption = "day" | "week" | "month";

const GanttViewPage: React.FC = () => {
  const [scale, setScale] = useState<ScaleOption>("day");

  // Compute scales based on selected scale
  const ganttScales = useMemo(() => {
    switch (scale) {
      case "day":
        return [
          { unit: "day", step: 1, date: "%M %d, %Y" },
          { unit: "hour", step: 1, date: "%g %A" },
        ];

      case "week":
        return [
          { unit: "month", step: 1, date: "%M" },

          { unit: "day", step: 1, date: "%d %M" },
        ];

      case "month":
        return [
          { unit: "year", step: 1, date: "%Y" },

          { unit: "month", step: 1, date: "%F" },
        ];

      default:
        return [
          { unit: "month", step: 1, date: "%M" },

          { unit: "day", step: 1, date: "%d %M" },
        ];
    }
  }, [scale]);

  return (
    <Container maxWidth="xl" sx={{ marginY: 3 }}>
      <Box>
        {/* <PageTitle title="Gantt View" subtitle="View scheduling in Gantt format" /> */}
        <Paper sx={{ padding: 3, marginTop: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 3,
              alignItems: "center",
            }}
          >
            <Typography variant="body1">
              Technician Schedule - April 24, 2024
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="scale-select-label">Scale</InputLabel>
              <Select
                labelId="scale-select-label"
                value={scale}
                onChange={(e: SelectChangeEvent<ScaleOption>) =>
                  setScale(e.target.value as ScaleOption)
                }
              >
                <MenuItem value="day">Day</MenuItem>
                <MenuItem value="week">Week</MenuItem>
                <MenuItem value="month">Month</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Gantt Chart */}
          <Box sx={{ marginBottom: 4 }}>
            <GanttChart
              key={scale}
              tasks={tasks}
              resources={resources}
              config={{
                xml_date: "%Y-%m-%d %H:%i",
                grid_width: 250,
                scale_height: 50,
                scales: ganttScales,
                columns: [
                  { name: "text", label: "Technician", tree: true, width: 200 },
                ],
              start_date: new Date(2026, 0, 30), 
    end_date: new Date(2026, 1, 15),
                smart_rendering: true,
                static_background: true,
                readonly: false,
                show_progress: false,
                drag_move: true,
                drag_resize: true,
                drag_progress: false,
                drag_links: false,
                preserve_scroll: true,
                row_height: 45,
                bar_height: 24,
                date_format: "%Y-%m-%d %H:%i",
                render: "split",
                min_column_width: scale === "day" ? 60 : 80,
                open_split_tasks: true,
              }}
            />
          </Box>

          {/* Unscheduled Jobs Section */}
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
              Unscheduled Jobs - Drag & drop onto Gantt Chart to schedule
            </Typography>
            <TableContainer sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: "10%" }}>
                      Job ID
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, width: "15%" }}>
                      Reference No
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, width: "12%" }}>
                      City
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, width: "25%" }}>
                      Address
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, width: "12%" }}>
                      Task Type
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, width: "8%" }}>
                      Duration
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, width: "10%" }}>
                      Priority
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, width: "10%" }}>
                      Due Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {unscheduledJobs.map((job) => (
                    <TableRow
                      key={job.id}
                      sx={{
                        "&:hover": { backgroundColor: "#f9f9f9" },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell
                        sx={{ backgroundColor: "#FFD700", fontWeight: 500 }}
                      >
                        {job.jobId}
                      </TableCell>
                      <TableCell>{job.referenceNo}</TableCell>
                      <TableCell>{job.city}</TableCell>
                      <TableCell>{job.address}</TableCell>
                      <TableCell>{job.taskType}</TableCell>
                      <TableCell>{job.duration}</TableCell>
                      <TableCell>{job.priority}</TableCell>
                      <TableCell>{job.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default GanttViewPage;
