import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Financial.css';

const Financial = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/explore');
  };

  return (
    <div className="financial">
      <h2>Financial</h2>
      <div className="financial-item">
        <h3>Investment trends</h3>
        <p>AI-generated financial report available</p>
      </div>
      <div className="financial-item">
        <h3>Financial trends</h3>
        <p>Let's explore the data insights together</p>
      </div>
      <button className="explore-button" onClick={handleExploreClick}>Explore</button>
    </div>
  );
};

export default Financial;
