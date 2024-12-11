import React from 'react';
import './FinancialOverview.css';

const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const daysInMonth = [
  '', '', '', 1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31, '', '', '', '', '', '',
];

const FinancialOverview = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  return (
    <div className="financial-overview">
      <h2>Financial Overview</h2>
      <div className="calendar">
        <div className="calendar-header">
          {daysOfWeek.map(day => (
            <div key={day} className="day-header">{day}</div>
          ))}
        </div>
        <div className="calendar-grid">
          {daysInMonth.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day ? (day === currentDay ? 'highlight' : '') : 'empty'}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;
