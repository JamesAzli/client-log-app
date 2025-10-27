import React, { useState, useEffect } from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import dayjs from "dayjs";
import defaultClients from "./data/defaultClients";
import ClientAttendanceTable from "./components/ClientAttendanceTable";
import ClientTable from "./components/ClientTable";
import "./components/ClientTable.css";

const App = () => {
  const [currentWeek, setCurrentWeek] = useState(dayjs());
  const [attendanceByWeek, setAttendanceByWeek] = useState({});
  const [clients, setClients] = useState(defaultClients);
  const [totalFees, setTotalFees] = useState(0);

  // Helper function to compute fee per client based on attendance
  const calculateFees = (clientList) => {
    const updatedClients = clientList.map((client) => {
      const attendedCount = client.schedules.filter((s) => s.attended).length;
      const feePerSession =
        client.type.toUpperCase() === "ABA" ? 270 : client.type === "2IN1" ? 360 : 0;
      const total = attendedCount * feePerSession;
      return { ...client, fee: total };
    });

    const grandTotal = updatedClients.reduce((acc, c) => acc + c.fee, 0);
    setTotalFees(grandTotal);
    return updatedClients;
  };

  // Load attendance data for the selected week
  useEffect(() => {
    const weekKey = currentWeek.startOf("week").format("YYYY-MM-DD");
    const storedWeek = attendanceByWeek[weekKey];
    if (storedWeek) {
      setClients(calculateFees(storedWeek));
    } else {
      // Reset attendance for new week
      const resetClients = defaultClients.map((client) => ({
        ...client,
        schedules: client.schedules.map((s) => ({ ...s, attended: false })),
      }));
      setClients(calculateFees(resetClients));
    }
  }, [currentWeek, attendanceByWeek]);

  // Toggle attendance for a given client/day
  const handleToggleAttendance = (clientId, day) => {
    const updated = clients.map((client) => {
      if (client.id === clientId) {
        const updatedSchedules = client.schedules.map((s) =>
          s.day === day ? { ...s, attended: !s.attended } : s
        );
        return { ...client, schedules: updatedSchedules };
      }
      return client;
    });

    const recalculated = calculateFees(updated);
    const weekKey = currentWeek.startOf("week").format("YYYY-MM-DD");
    setAttendanceByWeek({ ...attendanceByWeek, [weekKey]: recalculated });
    setClients(recalculated);
  };

  // Week navigation
  const goToPreviousWeek = () => setCurrentWeek(currentWeek.subtract(1, "week"));
  const goToNextWeek = () => setCurrentWeek(currentWeek.add(1, "week"));

  // Display range for current week
  const startOfWeek = currentWeek.startOf("week").add(1, "day");
  const endOfWeek = currentWeek.endOf("week").add(1, "day");

  return (
    <Container maxWidth="lg" className="app-container">
      <Box className="header">
        <Typography variant="h4" className="title">
          Client Attendance Log
        </Typography>
        <Typography variant="h6" className="week-range">
          Week of {startOfWeek.format("MMM D")} – {endOfWeek.format("MMM D, YYYY")}
        </Typography>

        <Box className="week-buttons">
          <Button
            variant="contained"
            className="week-button prev"
            onClick={goToPreviousWeek}
          >
            ← Previous Week
          </Button>
          <Button
            variant="contained"
            className="week-button next"
            onClick={goToNextWeek}
          >
            Next Week →
          </Button>
        </Box>
      </Box>

      {/* Attendance Table */}
      <ClientAttendanceTable
        clients={clients}
        onToggleAttendance={handleToggleAttendance}
        currentWeek={currentWeek}
      />

      {/* Fee Summary Table */}
      <ClientTable clients={clients} totalFees={totalFees} />
    </Container>
  );
};

export default App;
