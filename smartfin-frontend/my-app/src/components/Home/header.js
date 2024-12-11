// Header.js
import React, { useState } from 'react';
import './Header.css';

const Header = ({ onCreateTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleCreateTask = () => {
    if (newTask) {
      onCreateTask(newTask);
      setNewTask(''); // Clear input after creating task
    }
  };

  return (
    <header className="header">
      
      <input
        type="text"
        placeholder="Enter new task"
        className="task-input"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="task-button" onClick={handleCreateTask}>
        Create task
      </button>
      <button className="search-button">&#128269;</button>
      <button className="explore-button">Explore</button>
    </header>
  );
};

export default Header;
