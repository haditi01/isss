// src/ExpenseCategories.js
import React from 'react';
import './ExpenseCategories.css';

const ExpenseCategories = () => {
    const categories = [
        { name: 'Income overview', icon: 'income-icon.png' },
        { name: 'Financial goals', icon: 'goals-icon.png' },
        { name: 'Freelance projects', icon: 'freelance-icon.png' },
        { name: 'Event budgeting', icon: 'event-icon.png' }
    ];

    return (
        <div className="expense-categories">
            <h2>Expense categories</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>
                        <img src={category.icon} alt={category.name} />
                        {category.name}
                    </li>
                ))}
            </ul>
            <button>Add new</button>
        </div>
    );
};

export default ExpenseCategories;
