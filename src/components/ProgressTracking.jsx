import React from 'react';
import './ProgressTracking.css';

function ProgressTracking() {
  const progressData = [
    { course: 'Artificial Intelligence', progress: '75%' },
    { course: 'Software Engineering', progress: '60%' },
    { course: 'Machine Learning', progress: '85%' },
    // Add more data as needed
  ];

  return (
    <div className="content">
      <h2>Progress Tracking</h2>
      <div className="progress-tracking">
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {progressData.map((item, index) => (
              <tr key={index}>
                <td>{item.course}</td>
                <td>{item.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProgressTracking;
