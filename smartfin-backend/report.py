import pandas as pd
from fpdf import FPDF
import os

# Load dataset
df = pd.read_csv('updated_bankstatement.csv')

# Convert Date column to datetime
df['Date'] = pd.to_datetime(df['Date'])

# Initialize variables for financial analysis
category_spending = None
average_monthly_spending = None
monthly_cash_flow = None
emergency_fund_goal = None
monthly_savings = None
non_essential_spending = None
budgets = None
actual_vs_budget = None
over_budget = None

# Check if 'Sub Category' column exists
if 'Sub Category' in df.columns and 'Withdrawal' in df.columns and 'W/D' in df.columns:
    # Categorize expenses and deposits
    category_spending = df[df['W/D'] == 'Withdrawal'].groupby('Sub Category')['Withdrawal'].sum()

    # Extract Month from Date
    df['Month'] = df['Date'].dt.to_period('M')

    # Calculate average monthly spending for each category
    monthly_category_spending = df[df['W/D'] == 'Withdrawal'].groupby(['Month', 'Sub Category'])['Withdrawal'].sum().unstack().fillna(0)
    average_monthly_spending = monthly_category_spending.mean()

    # Calculate monthly cash flow
    monthly_cash_flow = df.groupby('Month').agg({'Deposit': 'sum', 'Withdrawal': 'sum'})
    monthly_cash_flow['Net Cash Flow'] = monthly_cash_flow['Deposit'] - monthly_cash_flow['Withdrawal']

    # Set emergency fund goal to 6 months of average monthly expenses
    emergency_fund_goal = 6 * monthly_cash_flow['Withdrawal'].mean()  # 6 months of average monthly expenses
    monthly_savings = df[df['W/D'] == 'Deposit']['Deposit'].sum() * 0.10  # Save 10% of deposits

    # Highlight non-essential spending (e.g., dining out, entertainment)
    non_essential_categories = ['Entertainment', 'Dining Out']
    non_essential_spending = df[df['Sub Category'].isin(non_essential_categories) & (df['W/D'] == 'Withdrawal')].groupby('Sub Category')['Withdrawal'].sum()

    # Set budgets slightly lower than the average to encourage savings
    budgets = average_monthly_spending * 0.9

    # Compare actual spending to budgets
    actual_vs_budget = monthly_category_spending - budgets

    # Identify categories where spending exceeds the budget
    over_budget = actual_vs_budget[actual_vs_budget > 0]

else:
    print("Required columns are missing.")

# Generate PDF report
def generate_report():
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    # Add Financial Report title
    pdf.cell(200, 10, txt="Financial Report", ln=True, align='C')

    # Add content sections
    pdf.ln(10)
    if category_spending is not None:
        pdf.cell(200, 10, txt="Spending by Category:", ln=True, align='L')
        pdf.multi_cell(0, 10, txt=str(category_spending), align='L')

    pdf.ln(10)
    if average_monthly_spending is not None:
        pdf.cell(200, 10, txt="Average Monthly Spending by Category:", ln=True, align='L')
        pdf.multi_cell(0, 10, txt=str(average_monthly_spending), align='L')

    pdf.ln(10)
    if monthly_cash_flow is not None:
        pdf.cell(200, 10, txt="Monthly Cash Flow:", ln=True, align='L')
        pdf.multi_cell(0, 10, txt=str(monthly_cash_flow), align='L')

    pdf.ln(10)
    if emergency_fund_goal is not None and monthly_savings is not None:
        pdf.cell(200, 10, txt=f"Recommended Monthly Savings for Emergency Fund: {monthly_savings}", ln=True, align='L')
        pdf.cell(200, 10, txt=f"Emergency Fund Goal: {emergency_fund_goal}", ln=True, align='L')

    pdf.ln(10)
    if non_essential_spending is not None:
        pdf.cell(200, 10, txt="Non-Essential Spending:", ln=True, align='L')
        pdf.multi_cell(0, 10, txt=str(non_essential_spending), align='L')

    pdf.ln(10)
    if budgets is not None:
        pdf.cell(200, 10, txt="Monthly Budgets by Category:", ln=True, align='L')
        pdf.multi_cell(0, 10, txt=str(budgets), align='L')

    pdf.ln(10)
    if actual_vs_budget is not None:
        pdf.cell(200, 10, txt="Actual vs Budget:", ln=True, align='L')
        pdf.multi_cell(0, 10, txt=str(actual_vs_budget), align='L')

    pdf.ln(10)
    if over_budget is not None:
        pdf.cell(200, 10, txt="Categories Over Budget:", ln=True, align='L')
        pdf.multi_cell(0, 10, txt=str(over_budget), align='L')

    # Save PDF to a file
    pdf_output = f'report.pdf'
    pdf_filepath = os.path.join(os.getcwd(), pdf_output)
    pdf.output(pdf_filepath)

# Generate the PDF report
generate_report()
