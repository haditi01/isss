import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Quiz({ onQuizComplete }) {
  const { course } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = {
    'Artificial Intelligence': [
      { question: 'What is AI?', options: ['Machine Learning', 'Artificial Intelligence', 'Data Science'], correct: 'Artificial Intelligence' },
      { question: 'Who is considered the father of AI?', options: ['Alan Turing', 'Elon Musk', 'Ada Lovelace'], correct: 'Alan Turing' },
      { question: 'Artificial Intelligence is about_____.', options: ['Playing a game on Computer','Making a machine Intelligent',' Programming on Machine with your Own Intelligence','Putting your intelligence in Machine'],correct: 'Making a machine Intelligent.'},
      { question:'Who is known as the -Father of AI"?', options: ['Fisher Ada',' Alan Turing','John McCarthy','Allen Newell'],correct:'John McCarthy'},
      { question: 'The application/applications of Artificial Intelligence is/are?', options:['Expert Systems',' Gaming',' Vision Systems','All of the above'],correct:'All of the above'},
],
    'Software Engineering': [
      { question: 'What is the first phase in SDLC?', options: ['Planning', 'Testing', 'Deployment'], correct: 'Planning' },
      { question: 'What does UML stand for?', options: ['Unified Modeling Language', 'Universal Modeling Language', 'Unique Modeling Language'], correct: 'Unified Modeling Language' },
      { question: 'Software is defined as ___________',options: ['set of programs, documentation & configuration of data',' set of programs','documentation and configuration of data',' None of the mentioned'], correct: 'set of programs, documentation & configuration of data'},
      { question: 'What are the features of Software Code?', options:['Simplicity','Accessibility','Modularity','All of the above'],correct: 'Modularity' },
      { question: 'What is a Functional Requirement?', options:['specifies the tasks the program must complete','specifies the tasks the program should not complete','specifies the tasks the program must not work','All of the mentioned'], correct: 'specifies the tasks the program must complete'}
    ],
    // Add more questions for other courses
  };

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmit = () => {
    const courseQuestions = questions[course];
    const correctAnswers = courseQuestions.filter(
      (q, index) => selectedAnswers[index] === q.correct
    ).length;
    const totalQuestions = courseQuestions.length;
    const calculatedScore = (correctAnswers / totalQuestions) * 100;
    setScore(calculatedScore);
    setQuizCompleted(true);
    onQuizComplete(course, calculatedScore);
  };

  if (quizCompleted) {
    return (
      <div>
        <h2>Quiz Completed!</h2>
        <p>Your score: {score}%</p>
      </div>
    );
  }

  return (
    <div className="quiz">
      <h2>{course} Quiz</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {questions[course].map((q, index) => (
          <div key={index}>
            <p>{q.question}</p>
            {q.options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleOptionChange(index, option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>Submit Quiz</button>
      </form>
    </div>
  );
}

export default Quiz;
