// src/components/Task.js
import React from 'react';
import './Task.css';

const Task = ({ task }) => {
  return (
    <li className="task">
      <input type="checkbox" checked={task.status === 'Completed'} readOnly />
      <span>{task.text}</span>
      <span className="status">{task.status}</span>
    </li>
  );
};

export default Task;
