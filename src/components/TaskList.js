import React, { useState } from "react";
import "./TaskList.css";
import { FaCheck, FaTrash } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = ({ tasks, setTasks, addTask, deleteTask, completeTask }) => {
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

  // Function to handle drag-and-drop functionality
  const onDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list, do nothing
    const reorderedTasks = [...tasks];
    const [reorderedItem] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, reorderedItem);
    setTasks(reorderedTasks); // Update the task order
  };

  return (
    <div className="task-box">
      <h2 className="task-title">Tasks</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <div
              className="task-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <ul className="task-list">
                {tasks.map((task, index) => (
                  <Draggable
                    key={index}
                    draggableId={`task-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        className={`task-item ${
                          task.completed ? "completed" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
