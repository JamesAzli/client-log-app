import { Button, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import "./ClientTable.css";

const ClientTableHeader = ({ currentWeek, setCurrentWeek }) => {
  const goToPreviousWeek = () => setCurrentWeek((prev) => prev.subtract(1, "week"));
  const goToNextWeek = () => setCurrentWeek((prev) => prev.add(1, "week"));

  const startOfWeek = currentWeek.startOf("week").add(1, "day");
  const endOfWeek = currentWeek.endOf("week").add(1, "day");

  return (
    <div className="header-container">
      <Button
        variant="contained"
        startIcon={<ArrowBack />}
        onClick={goToPreviousWeek}
        className="nav-button"
      >
        Previous
      </Button>

      <div className="header-title">
        <Typography variant="h6">
          Week of {startOfWeek.format("MMM D, YYYY")} – {endOfWeek.format("MMM D, YYYY")}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Track attendance and earnings per week
        </Typography>
      </div>

      <Button
        variant="contained"
        endIcon={<ArrowForward />}
        onClick={goToNextWeek}
        className="nav-button"
      >
        Next
      </Button>
    </div>
  );
};

export default ClientTableHeader;
