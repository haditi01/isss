import React, { useState } from 'react';
import './MyTasks.css';

const MyTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Pay Rent', status: 'Incomplete' },
    { id: 2, text: 'Research New Investment', status: 'Complete' },
  ]);
  const [newTask, setNewTask] = useState('');

  const handleTaskCheck = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: task.status === 'Complete' ? 'Incomplete' : 'Complete' } : task
    ));
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: tasks.length + 1,
        text: newTask,
        status: 'Incomplete',
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  return (
    <div className="my-tasks">
      <div className="my-ttasks-header">
        <h2>
          My tasks ({tasks.length})
          <button className="plus" onClick={handleAddTask}>+</button>
        </h2>
        <div className="small-box"></div> {/* Small box added */}
      </div>
      <div className="new-task">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add new task"
        />
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              id={`task-${task.id}`}
              onChange={() => handleTaskCheck(task.id)}
              checked={task.status === 'Complete'}
            />
            <label htmlFor={`task-${task.id}`}>{task.text}</label>
            <span className="status">{task.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTasks;
