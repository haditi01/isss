

import React, { useState } from 'react';

function IncomeTracker({ onAddIncome }) {
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');

	const handleAddIncome = () => {
		if (!amount || !description) return;
		onAddIncome(
			{
				amount: parseFloat(amount),
				description
			});
		setAmount('');
		setDescription('');
	};

	return (
		<div className="income-tracker">
			<h2>Budget</h2>
			<input
				type="number"
				placeholder="Amount"
				value={amount}
				onChange={
					(e) =>
						setAmount(e.target.value)
				} />
			<input
				type="text"
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)} />
			<button onClick={handleAddIncome}>
				Add Budget
			</button>
		</div>
	);
}

export default IncomeTracker;
