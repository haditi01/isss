// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Home/sidebar';
import FinancialOverview from './components/Home/FinancialOverview';
import MyTasks from './components/Home/MyTasks';
import ExpenseCategories from './components/Home/ExpenseCategories';
import FinancialProgress from './components/Home/FinancialProgress';
import Financial from './components/Home/Financial';
import Explore from './components/Home/explore/Explore';
import Loginsignup from './components/Loginsignup/Loginsignup';
import Profile from './components/Profile/Profile';
import Spend from './components/Home/Spend';
import BarChart from './components/charts/BarChart';
import DoughnutChart from './components/charts/DoughnutChart';
import LineChart from './components/charts/LineChart';
import PieChart from './components/charts/PieChart';
import data from './data/dataset.json';
import Budget from './components/budget/budget';
import ChatbotModal from './components/chatbot/ChatbotModal';
import ReportModal from './components/Home/Report/ReportModal';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Financial Report Ready', status: "Today's" },
    { id: 2, text: 'Sign Financial Agreement', status: "Today's Task" },
    { id: 3, text: 'Keynote: Market Trends Tomorrow', status: 'Upcoming' },
    { id: 4, text: 'Research New Investment', status: 'Financial' },
    { id: 5, text: 'Automated budgeting', status: "This month's" },
  ]);

  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const handleCreateTask = (newTaskText) => {
    const newTask = {
      id: tasks.length + 1,
      text: newTaskText,
      status: 'New',
    };
    setTasks([...tasks, newTask]);
  };

  const handleTaskCheck = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const processData = (data) => {
      const dates = data.map(item => new Date(item.Date).toLocaleDateString());
      const amounts = data.map(item => item.Amount);
      const categories = [...new Set(data.map(item => item.Category))];

      const categoryAmounts = categories.map(category => {
        return data.filter(item => item.Category === category).reduce((acc, curr) => acc + curr.Amount, 0);
      });

      setChartData({
        dates,
        amounts,
        categories,
        categoryAmounts
      });
    };

    processData(data);
  }, []);

  return (
    <div className="app-container">
      {isHomePage && <Sidebar />}
      <div className={`main ${isHomePage ? 'home-page' : ''}`}>
        {isHomePage && (
          <div>
            <button onClick={toggleChatbot} className="chatbot-icon">
              <img src="path-to-your-icon.png" alt="Chatbot Icon" />
            </button>
            <ChatbotModal isOpen={isChatbotVisible} onClose={toggleChatbot} />
          </div>
        )}
        <Routes>
          <Route path="/" element={<Loginsignup />} />
          <Route
            path="/home"
            element={
              <div className="main-content">
                <FinancialOverview />
                <MyTasks tasks={tasks} onTaskCheck={handleTaskCheck} />
                <Financial />
                <ExpenseCategories />
                <FinancialProgress />
                <Spend />
              </div>
            }
          />
          <Route path="/report" element={<ReportModal onClose={toggleChatbot} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-budget" element={<Budget />} />
          <Route
            path="/dashboard"
            element={
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
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
