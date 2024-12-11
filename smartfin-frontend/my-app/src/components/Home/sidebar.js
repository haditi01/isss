// Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNewBudgetClick = () => {
    navigate('/new-budget');
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-ul">
          <li className="sidebar-item"><Link to="/home">Home</Link></li>
          <li className="sidebar-item"><Link to="/dashboard">Dashboard</Link></li>
          <li className="sidebar-item"><Link to=" http://localhost:8501">Chatbot</Link></li>
          <li className="sidebar-item"><Link to="/about">About Us</Link></li>
          <li className="sidebar-item"><Link to="/profile">Profile</Link></li>
          <li className="sidebar-item"><Link to="/report">Report</Link></li>
          <li><Link to="http://localhost:8502/">Recommondations</Link></li>
          <li className="sidebar-item">
            <button className="add-item-button" onClick={handleNewBudgetClick}>
              New Budget
            </button>
          </li>
          <li className="sidebar-item">
          <button className="logout-button">Log out</button>
          </li>
          
        </ul>
      </nav>
      
    </aside>
  );
};

export default Sidebar;
