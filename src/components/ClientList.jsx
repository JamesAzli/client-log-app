// src/components/ClientList.jsx
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  Grid,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ClientList = ({ clients, updateClient, deleteClient }) => {
  const toggleAttendance = (client) => {
    updateClient({ ...client, attended: !client.attended });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Client List</Typography>
      {clients.map((client) => (
        <Paper key={client.id} sx={{ p: 2, mb: 1, borderRadius: 2 }}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={5}>
              <Typography variant="subtitle1">{client.name}</Typography>
              <Typography variant="body2">{client.date}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2">{client.startTime} - {client.endTime}</Typography>
              <Typography variant="body2">{client.type}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">₱{client.fee}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Checkbox checked={client.attended} onChange={() => toggleAttendance(client)} />
            </Grid>
            <Grid item xs={1}>
              <IconButton color="error" onClick={() => deleteClient(client.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default ClientList;
