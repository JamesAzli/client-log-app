import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  MenuItem,
} from "@mui/material";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const programs = ["ABA", "2IN1"];

const AddClientForm = ({ clients, setClients }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  const addClient = () => {
    if (!name || !type || !day || !time) return alert("Please complete all fields");
    const newClient = {
      id: Date.now(),
      name,
      type,
      schedules: [{ day, time, attended: false }],
    };
    setClients([...clients, newClient]);
    setName("");
    setType("");
    setDay("");
    setTime("");
  };

  return (
    <Paper sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        ➕ Add Client
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Client Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Program"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
          >
            {programs.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            fullWidth
          >
            {daysOfWeek.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Time (e.g., 9am-10am)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={addClient}>
          Add Client
        </Button>
      </Box>
    </Paper>
  );
};

export default AddClientForm;
