import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";
import "./ClientTable.css";

const ClientTable = ({ totalFees = 0 }) => {
  return (
    <Paper elevation={2} className="client-table-container">
      <Table className="client-table">
        <TableHead>
          <TableRow>
            <TableCell className="header-cell">Total Fee (₱)</TableCell>
            <TableCell className="header-cell"></TableCell>
            <TableCell className="header-cell" align="right">
              <Typography variant="subtitle1" className="total-value">
                ₱{(totalFees || 0).toLocaleString()}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </Paper>
  );
};

export default ClientTable;
