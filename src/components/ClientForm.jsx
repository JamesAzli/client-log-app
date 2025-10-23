// src/components/ClientForm.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";

const ClientForm = ({ addClient }) => {
  const [clientData, setClientData] = useState({
    id: Date.now(),
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "",
    attended: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const calculateFee = (type, start, end) => {
    if (!type || !start || !end) return 0;

    const startTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);
    const duration = (endTime - startTime) / (1000 * 60 * 60);

    if (type === "ABA") {
      if (duration >= 2) return 270;
      if (duration === 1) return 135;
      return 135 * duration;
    }
    if (type === "2in1") return 360;

    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fee = calculateFee(clientData.type, clientData.startTime, clientData.endTime);
    addClient({ ...clientData, id: Date.now(), fee });
    setClientData({
      id: Date.now(),
      name: "",
      date: "",
      startTime: "",
      endTime: "",
      type: "",
      attended: false,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Client Name" name="name" value={clientData.name} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth type="date" name="date" value={clientData.date} onChange={handleChange} required />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth type="time" name="startTime" label="Start Time" value={clientData.startTime} onChange={handleChange} required />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth type="time" name="endTime" label="End Time" value={clientData.endTime} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Type"
            name="type"
            value={clientData.type}
            onChange={handleChange}
            required
          >
            <MenuItem value="ABA">ABA</MenuItem>
            <MenuItem value="2in1">2 in 1</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" type="submit">Add Client</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientForm;
