import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Courses from './components/Courses';
import ProgressTracking from './components/ProgressTracking';
import StudyMaterial from './components/StudyMaterial';
import Quiz from './components/Quiz';
//import Courses from './components/Courses';

function App() {
  const [progressData, setProgressData] = useState({
    'Artificial Intelligence': 0,
    'Software Engineering': 0,
    'Software Testing': 0,
    'Web Development': 0,
    'Java': 0,
    'Machine Learning': 0,
    'Deep Learning': 0,
    'NLP': 0,
    'Data Analysis': 0,
    'Python': 0,
    'C': 0,
    'C++': 0,
    'Data Science': 0,
  });

  const handleQuizCompletion = (course, score) => {
    setProgressData((prevProgressData) => ({
      ...prevProgressData,
      [course]: score,
    }));
  };

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/progress" element={<ProgressTracking progressData={progressData} />} />
            <Route path="/materials" element={<StudyMaterial />} />
            <Route path="/quiz/:course" element={<Quiz onQuizComplete={handleQuizCompletion} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
