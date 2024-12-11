// Visualization.js
import React,
{
	useEffect,
	useRef
} from 'react';
import * as d3 from 'd3';

function Visualization(
	{
		expenses,
		incomes,
		remainingIncome,
		totalExpenditure,
		percentageExpended
	}) {
	const svgRef = useRef();

	useEffect(() => {
		// Create a combined dataset of incomes and expenses
		const data = incomes.map((income) => ({
			type: 'Income',
			description: `Income: ${income.description}`,
			amount: income.amount,
		})).concat(expenses.map((expense) => ({
			type: 'Expense',
			description: `Expense: ${expense.description}`,
			amount: expense.amount,
		})));

		// Clear previous chart
		d3.select(svgRef.current).selectAll('*').remove();

		// Create a new chart
		const svg = d3.select(svgRef.current);

		const width = 400;
		const height = 200;

		const xScale = d3.scaleBand().domain(
			data.map((d) => d.description))
			.range([0, width])
			.padding(0.1);
		const yScale =
			d3.scaleLinear()
				.domain(
					[
						0,
						d3.max(data, (d) => d.amount)
					]).range([height, 0]);

		svg.append('g').attr('transform', `translate(50, 0)`)
			.call(d3.axisLeft(yScale));
		svg.append('g').attr('transform', `translate(50, ${height})`)
			.call(d3.axisBottom(xScale));

		svg.selectAll('.bar')
			.data(data)
			.enter()
			.append('rect')
			.attr('class',
				(d) => (d.type === 'Income' ?
					'income-bar' : 'expense-bar'))
			.attr('x', (d) => xScale(d.description) + 50)
			.attr('y', (d) => yScale(d.amount))
			.attr('width', xScale.bandwidth())
			.attr('height', (d) => height - yScale(d.amount));

	}, [expenses, incomes]);

	return (
		<div className="visualization">
			<h2>Financial Visualization</h2>
			<p>
				Total Expenditure:
				${totalExpenditure.toFixed(2)}
			</p>
			<p>
				Remaining Budget:
				${remainingIncome.toFixed(2)}
			</p>
			<p>
				Percentage Expended:
				{percentageExpended.toFixed(2)}%
			</p>
			<svg ref={svgRef}
				width={500} height={250}></svg>
		</div>
	);
}

export default Visualization;
