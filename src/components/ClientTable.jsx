import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
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
            <TableCell className="header-cell">Client</TableCell>
            <TableCell className="header-cell"></TableCell>
            <TableCell className="header-cell" align="right">
              Total Fee (₱)
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow className="total-row">
            <TableCell colSpan={2}>
              <Typography variant="subtitle1" className="total-label">
                Total Fees
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1" className="total-value">
                ₱{(totalFees || 0).toLocaleString()}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ClientTable;
