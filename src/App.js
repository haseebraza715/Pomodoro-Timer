import React, { useState, useEffect, useCallback } from "react";
import "./App.css"; // Global CSS
import TimerDisplay from "./components/TimerDisplay"; // Timer Component
import Settings from "./components/Settings"; // Settings Component
import TaskList from "./components/TaskList";
import Analytics from "./components/Analytics"; // Analytics Component

const App = () => {
  // **State Variables**
  const [timeLeft, setTimeLeft] = useState(1500); // Default timer: 25 minutes (in seconds)
  const [isRunning, setIsRunning] = useState(false); // Timer running or paused
  const [sessionType, setSessionType] = useState("Work"); // "Work", "Short Break", or "Long Break"
  const [completedWorkSessions, setCompletedWorkSessions] = useState(0); // Tracks completed "Work" sessions
  const [durations, setDurations] = useState({
    workDuration: 1500, // 25 minutes in seconds
    shortBreakDuration: 300, // 5 minutes in seconds
    longBreakDuration: 900, // 15 minutes in seconds
  });
  const [tasks, setTasks] = useState([]); // Array to store tasks
  const [sessionHistory, setSessionHistory] = useState([]); // Track session history

  // **Task Management Functions**
  const addTask = (task) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { name: task, completed: false, priority: false },
    ]);
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const completeTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const togglePriority = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, priority: !task.priority } : task
      )
    );
  };

  // **Load settings and session history from localStorage**
  useEffect(() => {
    const savedDurations = JSON.parse(localStorage.getItem("durations"));
    const savedCompletedSessions = JSON.parse(
      localStorage.getItem("completedSessions")
    );
    const savedSessionHistory = JSON.parse(
      localStorage.getItem("sessionHistory")
    );

    if (savedDurations) setDurations(savedDurations);
    if (savedCompletedSessions)
      setCompletedWorkSessions(savedCompletedSessions);
    if (savedSessionHistory) setSessionHistory(savedSessionHistory);
  }, []);

  // **Save settings and session history to localStorage**
  useEffect(() => {
    localStorage.setItem("durations", JSON.stringify(durations));
    localStorage.setItem(
      "completedSessions",
      JSON.stringify(completedWorkSessions)
    );
    localStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
  }, [durations, completedWorkSessions, sessionHistory]);

  // **Handle Settings Save**
  const handleSaveSettings = (newDurations) => {
    setDurations(newDurations);
    if (sessionType === "Work") setTimeLeft(newDurations.workDuration);
    if (sessionType === "Short Break")
      setTimeLeft(newDurations.shortBreakDuration);
    if (sessionType === "Long Break")
      setTimeLeft(newDurations.longBreakDuration);
  };

  // **Timer Logic**
  const handleSessionEnd = useCallback(() => {
    const timestamp = new Date().toLocaleString(); // Record time of session end
    if (sessionType === "Work") {
      setCompletedWorkSessions((prev) => prev + 1);
      setSessionHistory((prev) => [
        ...prev,
        { sessionType: "Work", timestamp },
      ]);

      // Transition logic: Long Break after 4 Work sessions, otherwise Short Break
      if ((completedWorkSessions + 1) % 4 === 0) {
        setSessionType("Long Break");
        setTimeLeft(durations.longBreakDuration); // 15 minutes for Long Break
      } else {
        setSessionType("Short Break");
        setTimeLeft(durations.shortBreakDuration); // 5 minutes for Short Break
      }
    } else {
      setSessionHistory((prev) => [...prev, { sessionType, timestamp }]);
      setSessionType("Work");
      setTimeLeft(durations.workDuration); // 25 minutes for Work
    }
    setIsRunning(false); // Pause the timer after each session ends
  }, [sessionType, durations, completedWorkSessions]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            handleSessionEnd(); // Handle session transitions when the timer ends
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup timer
  }, [isRunning, handleSessionEnd]);

  // **Start Timer**
  const handleStart = () => {
    setIsRunning(true);
  };

  // **Reset Timer**
  const handleReset = () => {
    setIsRunning(false);
    setSessionType("Work"); // Reset to Work session
    setTimeLeft(durations.workDuration); // Use current Work duration
    setCompletedWorkSessions(0); // Reset completed Work sessions
    setSessionHistory([]); // Clear session history
  };

  // **Render App**
  return (
    <div className="App">
      <div className="main-grid">
        {/* Tasks */}
        <div className="box">
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            addTask={addTask}
            deleteTask={deleteTask}
            completeTask={completeTask}
            togglePriority={togglePriority}
          />
        </div>

        {/* Work Timer */}
        <div className="box">
          <TimerDisplay
            timeLeft={timeLeft}
            sessionType={sessionType}
            completedWorkSessions={completedWorkSessions}
            durations={durations}
          />
          <div className="timer-controls">
            <button className="start-button" onClick={handleStart}>
              {isRunning ? "Pause" : "Start"}
            </button>
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="box">
          <Settings onSave={handleSaveSettings} />
        </div>

        {/* Analytics */}
        <div className="box">
          <Analytics sessionHistory={sessionHistory} />
        </div>
      </div>

      <div className="footer">
        <p>Today's Completed Sessions: {completedWorkSessions}</p>
      </div>
    </div>
  );
};

export default App;
