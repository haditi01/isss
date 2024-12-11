// src/components/FinancialProgress.js
import React, { useState } from 'react';
import './FinancialProgress.css';
import axios from 'axios';

const FinancialProgress = () => {
  const [topic, setTopic] = useState('');
  const [audioSrc, setAudioSrc] = useState('');

  const handleInputChange = (event) => {
    setTopic(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/generate_podcast', { topic }, {
        responseType: 'blob'
      });
      const url = URL.createObjectURL(new Blob([response.data]));
      setAudioSrc(url);
      console.log('Podcast generated successfully');
    } catch (error) {
      console.error('Error generating podcast:', error);
    }
  };

  return (
    <div className="financial-progress">
      <h2>Podcast Generator</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="topic-input">Enter Topic:</label>
        <input
          type="text"
          id="topic-input"
          value={topic}
          onChange={handleInputChange}
          placeholder="Enter a topic for the podcast"
        />
        <button type="submit">Submit</button>
      </form>
      {audioSrc && <audio controls src={audioSrc}></audio>}
    </div>
  );
};

export default FinancialProgress;
