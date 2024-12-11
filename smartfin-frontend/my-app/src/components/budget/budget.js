import React, { useState, useEffect } from 'react';
import './budget.css';
import ExpenseTracker from './ExpenseTracker.js';
import IncomeTracker from './IncomeTracker.js';
import Visualization from './Visualization.js';

function Budget(props) {
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenditure, setTotalExpenditure] = useState(0);
    const [remainingIncome, setRemainingIncome] = useState(0);
    const [percentageExpended, setPercentageExpended] = useState(0);

    useEffect(() => {
        // Calculate total income
        let totalIncomeAmount = incomes.reduce((total, income) => total + income.amount, 0);
        setTotalIncome(totalIncomeAmount);

        // Calculate total expenditure
        let totalExpenditureAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
        setTotalExpenditure(totalExpenditureAmount);

        // Calculate remaining income
        setRemainingIncome(totalIncomeAmount - totalExpenditureAmount);

        // Calculate percentage expended
        if (totalIncomeAmount !== 0) {
            setPercentageExpended((totalExpenditureAmount / totalIncomeAmount) * 100);
        }
    }, [incomes, expenses]);

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    const addIncome = (income) => {
        setIncomes([...incomes, income]);
        setExpenses([]); // Reset expenses for each income
    };

    return (
        <div className="hello">
            <h1>Create Your Budget</h1>
            <div className="tracker-container">
                <ExpenseTracker onAddExpense={addExpense} />
                <IncomeTracker onAddIncome={addIncome} />
            </div>
            <Visualization
                expenses={expenses}
                incomes={incomes}
                remainingIncome={remainingIncome}
                totalExpenditure={totalExpenditure}
                percentageExpended={percentageExpended}
            />
        </div>
    );
}

export default Budget;
