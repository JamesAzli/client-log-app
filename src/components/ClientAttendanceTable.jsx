import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Typography,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";
import "./ClientTable.css";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const ClientAttendanceTable = ({ clients, onToggleAttendance, currentWeek }) => {
  const safeWeek = currentWeek && currentWeek.startOf ? currentWeek : dayjs();
  const startOfWeek = safeWeek.startOf("week").add(1, "day");

  return (
    <Paper elevation={2} className="attendance-table-container">
      <Table className="attendance-table">
        <TableHead>
          <TableRow>
            <TableCell className="header-cell">Client</TableCell>
            <TableCell className="header-cell">Type</TableCell>
            {daysOfWeek.map((day, i) => {
              const date = startOfWeek.add(i, "day");
              return (
                <TableCell key={day} align="center" className="header-cell">
                  {day}
                  <br />
                  <Typography variant="caption" color="textSecondary">
                    {date.format("MMM D")}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="table-row">
              <TableCell className="client-name">{client.name}</TableCell>
              <TableCell>{client.type}</TableCell>
              {daysOfWeek.map((day) => {
                const schedule = client.schedules.find((s) => s.day === day);
                return (
                  <TableCell key={day} align="center">
                    {schedule ? (
                      <Checkbox
                        checked={schedule.attended}
                        onChange={() => onToggleAttendance(client.id, day)}
                        color="success"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ClientAttendanceTable;
