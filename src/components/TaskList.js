import React, { useState } from "react";
import "./TaskList.css";
import { FaCheck, FaTrash } from "react-icons/fa";

const TaskList = ({ tasks, addTask, deleteTask, completeTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask(""); // Clear input after adding
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask(); // Add task when Enter is pressed
    }
  };

  return (
    <div className="task-box">
      <h2 className="task-title">Tasks</h2>
      <div className="task-container">
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              <span className="task-text">{task.name}</span>
              <div className="task-buttons">
                <button
                  className="complete-button"
                  onClick={() => completeTask(index)}
                  title="Mark as Complete"
                >
                  <FaCheck />
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                  title="Delete Task"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Task Input moved below */}
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask} title="Add Task">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskList;
