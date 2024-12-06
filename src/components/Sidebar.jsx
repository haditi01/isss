import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Academic Portal</h2>
      <ul>
        <li><Link to="/">Courses</Link></li>
        <li><Link to="/progress">Progress Tracking</Link></li>
        <li><Link to="/materials">Study Materials</Link></li>
        <li><Link to="/quiz/Artificial Intelligence">AI Quiz</Link></li>
        <li><Link to="/quiz/Software Engineering">Software Eng. Quiz</Link></li>
        <li><Link to="http://localhost:8501/">Recommondations</Link></li>

        {/* Add more quiz links as needed */}
      </ul>
    </div>
  );
}

export default Sidebar;
