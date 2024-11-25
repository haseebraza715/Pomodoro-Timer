import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./TimerDisplay.css"; // Optional: Create a specific CSS file for this component

const TimerDisplay = ({
  timeLeft,
  sessionType,
  completedWorkSessions,
  durations,
}) => {
  // Format time into MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate progress for the circular progress bar
  const calculateProgress = () => {
    if (!durations || !durations[`${sessionType.toLowerCase()}Duration`]) {
      return 0; // Fallback to 0 if invalid
    }
    const totalDuration = durations[`${sessionType.toLowerCase()}Duration`];
    return Math.min(((totalDuration - timeLeft) / totalDuration) * 100, 100); // Ensure progress doesn't exceed 100%
  };

  return (
    <div className="timer-display">
      <h1 className="session-type">{sessionType}</h1>
      <div className="circular-progress-container">
        <CircularProgressbar
          value={calculateProgress()}
          text={formatTime(timeLeft)}
          styles={buildStyles({
            textSize: "18px",
            pathColor: sessionType === "Work" ? "#4caf50" : "#2196f3",
            textColor: "#ffffff",
            trailColor: "#555555",
            backgroundColor: "#333333",
          })}
        />
      </div>
      <p className="work-sessions">
        Completed Work Sessions: {completedWorkSessions}
      </p>
    </div>
  );
};

export default TimerDisplay;
