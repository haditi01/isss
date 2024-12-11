import React from 'react';
import './Courses.css';

function Courses() {
  const courses = [
    { title: 'Artificial Intelligence', description: 'Learn the fundamentals of AI.' },
    { title: 'Software Engineering', description: 'Study the software development lifecycle.' },
    { title: 'Software Testing', description: 'Learn the different testing techniques.' },
    { title: 'Web Development', description: 'Master front-end and back-end development.' },
    { title: 'Java', description: 'Object-oriented programming with Java.' },
    { title: 'Machine Learning', description: 'Master machine learning algorithms.' },
    { title: 'Deep Learning', description: 'Advanced topics in neural networks.' },
    { title: 'NLP', description: 'Natural language processing techniques.' },
    { title: 'Data Analysis', description: 'Data analysis using Python and R.' },
    { title: 'Python', description: 'Beginner to advanced Python programming.' },
    { title: 'C', description: 'Programming fundamentals with C.' },
    { title: 'C++', description: 'Master object-oriented programming with C++.' },
    { title: 'Data Science', description: 'Learn data analysis and visualization.' },
  ];

  return (
    <div className="courses">
      <h2>Available Courses</h2>
      <div className="courses-grid">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
