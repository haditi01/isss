import React from 'react';
import './StudyMaterial.css';

function StudyMaterial() {
  const materials = [
    { title: 'AI Book', link: 'https://www.geeksforgeeks.org/What-is-ai-artificial-intelligence/' },
    { title: 'Software Engineering Notes', link: 'https://www.geeksforgeeks.org/software-engineering/' },
    { title: 'Python Documentation', link: 'https://docs.python.org/3/tutorial/index.html' },
  ];

  return (
    <div className="study-material">
      <h2>Study Materials</h2>
      <ul>
        {materials.map((material, index) => (
          <li key={index}>
            <a href={material.link} target="_blank" rel="noopener noreferrer">
              {material.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudyMaterial;
