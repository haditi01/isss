// src/components/Home/Dashboard.js
import React from 'react';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import PieChart from '../charts/PieChart';
import DoughnutChart from '../charts/DoughnutChart';

const Dashboard = ({ chartData }) => {
  return (
    <div>
      <h1>Investment Dashboard</h1>
      {chartData && (
        <div className="chart-container">
          <div className="chart"><BarChart data={chartData} /></div>
          <div className="chart"><LineChart data={chartData} /></div>
          <div className="chart"><PieChart data={chartData} /></div>
          <div className="chart"><DoughnutChart data={chartData} /></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
