

import React,
{
	useState
} from 'react';

function ExpenseTracker({ onAddExpense }) {
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState('');

	const handleAddExpense = () => {
		if (!description || !amount) return;
		const newExpense = {
			description,
			amount: parseFloat(amount)
		};
		onAddExpense(newExpense);
		setDescription('');
		setAmount('');
	};

	return (
		<div className="tracker">
			<h2>Add Expense</h2>
			<div className="input-group">
				<input
					type="text"
					placeholder="Description"
					value={description}
					onChange={
						(e) =>
							setDescription(e.target.value)
					} />
				<input
					type="number"
					placeholder="Amount"
					value={amount}
					onChange={
						(e) =>
							setAmount(e.target.value)
					} />
				<button onClick={handleAddExpense}>
					Add Expense
				</button>
			</div>
		</div>
	);
}

export default ExpenseTracker;
