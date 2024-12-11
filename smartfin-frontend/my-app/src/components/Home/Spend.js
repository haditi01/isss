import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Spend.css';

const Spend = () => {
  const navigate = useNavigate();
  const [spendingData, setSpendingData] = useState({
    currentMonth: 0,
    forecastedNextMonth: 0,
    mse: 0,
    mae: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpendingData = async () => {
      try {
        const response = await axios.get('/api/spending');
        const data = response.data;
        setSpendingData({
          currentMonth: data.current_month_spending,
          forecastedNextMonth: data.forecasted_next_month_spending,
          mse: data.mse,
          mae: data.mae
        });
        setLoading(false); // Data loaded successfully
      } catch (error) {
        console.error("Error fetching spending data", error);
        setError('Error fetching data. Please try again later.'); // Set error message
        setLoading(false); // Loading failed
      }
    };

    fetchSpendingData();
  }, []);

  const handleExploreClick = () => {
    navigate('/explore');
  };

  if (loading) {
    return <div className="Spend">Loading...</div>; // Render loading indicator
  }

  if (error) {
    return <div className="Spend">{error}</div>; // Render error message
  }

  return (
    <div className="Spend">
      <h2>Spend</h2>
      <div className="Spend-item">
        <h4>Last Month &nbsp; Rs.{spendingData.currentMonth.toFixed(2)}</h4>
      </div>
      <div className="Spend-item">
        <h4>Next Month &nbsp; Rs.{spendingData.forecastedNextMonth.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default Spend;
