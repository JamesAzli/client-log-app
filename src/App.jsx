// src/App.jsx
import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";
import DateRangeCalculator from "./components/DateRangeCalculator";
import localforage from "localforage";
import "./styles.css";

const App = () => {
  const [clients, setClients] = useState([]);

  // Load from local storage
  useEffect(() => {
    localforage.getItem("clients").then((savedClients) => {
      if (savedClients) setClients(savedClients);
    });
  }, []);

  // Save to local storage
  useEffect(() => {
    localforage.setItem("clients", clients);
  }, [clients]);

  const addClient = (client) => {
    setClients([...clients, client]);
  };

  const updateClient = (updatedClient) => {
    setClients(clients.map((c) => (c.id === updatedClient.id ? updatedClient : c)));
  };

  const deleteClient = (id) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          🗓️ Client Log Tracker
        </Typography>

        <ClientForm addClient={addClient} />

        <Box mt={4}>
          <ClientList clients={clients} updateClient={updateClient} deleteClient={deleteClient} />
        </Box>

        <Box mt={4}>
          <DateRangeCalculator clients={clients} />
        </Box>
      </Paper>
    </Container>
  );
};

export default App;
