import React from "react";
import "./Controls.css"; // Optional: Create a specific CSS file for this component

const Controls = ({ isRunning, onStart, onStop, onReset }) => {
  return (
    <div className="controls">
      {/* Show "Start" or "Pause" button based on isRunning */}
      {!isRunning ? (
        <button className="start-button" onClick={onStart}>
          Start
        </button>
      ) : (
        <button className="pause-button" onClick={onStop}>
          Pause
        </button>
      )}
      <button className="reset-button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default Controls;
