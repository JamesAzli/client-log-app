// src/components/DateRangeCalculator.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const DateRangeCalculator = ({ clients }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    const rangeClients = clients.filter((c) => c.date >= start && c.date <= end);
    const totalFee = rangeClients.reduce((acc, c) => acc + c.fee, 0);
    setTotal(totalFee);
  };

  return (
    <Box textAlign="center">
      <Typography variant="h6" gutterBottom>Calculate Fee Range</Typography>
      <TextField type="date" value={start} onChange={(e) => setStart(e.target.value)} />
      <TextField type="date" value={end} onChange={(e) => setEnd(e.target.value)} sx={{ mx: 1 }} />
      <Button variant="contained" onClick={calculateTotal}>Calculate</Button>
      {total > 0 && (
        <Typography mt={2}>Total Fee: ₱{total}</Typography>
      )}
    </Box>
  );
};

export default DateRangeCalculator;
