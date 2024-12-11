import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.dates,
    datasets: [{
      label: 'Amount',
      data: data.amounts,
      fill: false,
      borderColor: 'rgba(75, 192, 192, 0.6)',
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      pointRadius: 5,
    }]
  };

  return <Line data={chartData} />;
};

export default LineChart;
