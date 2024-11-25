import React, { useState } from "react";
import "./Settings.css"; // Optional: Create a CSS file for styling

const Settings = ({ onSave }) => {
  const [workDuration, setWorkDuration] = useState(25); // Default: 25 minutes
  const [shortBreakDuration, setShortBreakDuration] = useState(5); // Default: 5 minutes
  const [longBreakDuration, setLongBreakDuration] = useState(15); // Default: 15 minutes

  const handleSave = () => {
    onSave({
      workDuration: workDuration * 60, // Convert to seconds
      shortBreakDuration: shortBreakDuration * 60,
      longBreakDuration: longBreakDuration * 60,
    });
  };

  return (
    <div className="settings">
      <h2>Customize Durations</h2>
      <div className="input-group">
        <label>Work Duration (minutes):</label>
        <input
          type="number"
          value={workDuration}
          onChange={(e) => setWorkDuration(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>Short Break Duration (minutes):</label>
        <input
          type="number"
          value={shortBreakDuration}
          onChange={(e) => setShortBreakDuration(Number(e.target.value))}
        />
      </div>
      <div className="input-group">
        <label>Long Break Duration (minutes):</label>
        <input
          type="number"
          value={longBreakDuration}
          onChange={(e) => setLongBreakDuration(Number(e.target.value))}
        />
      </div>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Settings;
