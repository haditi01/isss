import pandas as pd
import datetime
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error
import numpy as np
import spending

def load_data(file_path):
    return pd.read_csv(file_path)

def get_monthly_spending(data):
    # Filter only debit transactions
    debit_data = data[data['DrCr'] == 'Db']
    
    # Group by year and month, and sum the amounts
    monthly_spending = debit_data.groupby(['Year', 'Month'])['amount'].sum().reset_index()
    
    # Create a 'Date' column for easier manipulation
    monthly_spending['Date'] = pd.to_datetime(monthly_spending[['Year', 'Month']].assign(Day=1))
    
    return monthly_spending

def get_current_month_spending(data):
    # Get the current date
    current_date = datetime.datetime.now()
    current_month = current_date.month
    current_year = current_date.year

    # Filter data for the current month and year
    current_month_data = data[(data['Month'] == current_month) & (data['Year'] == current_year)]

    # Calculate the total spending for the current month (only considering 'Db' entries)
    current_month_spending = current_month_data[current_month_data['DrCr'] == 'Db']['amount'].sum()
    
    return current_month_spending

def forecast_next_month_spending(monthly_spending):
    # Prepare the data for linear regression
    X = np.array(range(len(monthly_spending))).reshape(-1, 1)
    y = monthly_spending['amount'].values
    
    # Split the data into training and test sets
    split_index = int(0.8 * len(monthly_spending))
    X_train, X_test = X[:split_index], X[split_index:]
    y_train, y_test = y[:split_index], y[split_index:]
    
    # Create and fit the model
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    # Predict the spending for the test set
    y_pred = model.predict(X_test)
    
    # Calculate MSE and MAE
    mse = mean_squared_error(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    
    # Predict the spending for the next month
    next_month_index = np.array([[len(monthly_spending)]])
    forecasted_next_month_spending = model.predict(next_month_index)[0]
    
    return forecasted_next_month_spending, mse, mae

def main(file_path):
    data = load_data(file_path)
    monthly_spending = get_monthly_spending(data)
    
    current_month_spending = get_current_month_spending(data)
    
    # If there is no data for the current month, specify a month and year with data (January 2022 in this case)
    if current_month_spending == 0:
        specific_month = 1
        specific_year = 2022
        specific_month_data = data[(data['Month'] == specific_month) & (data['Year'] == specific_year)]
        current_month_spending = specific_month_data[specific_month_data['DrCr'] == 'Db']['amount'].sum()
    
    forecasted_next_month_spending, mse, mae = forecast_next_month_spending(monthly_spending)
    
    return current_month_spending, forecasted_next_month_spending, mse, mae

# Specify the path to the CSV file
file_path = './bankstat.csv'

# Run the main function
current_month_spending, forecasted_next_month_spending, mse, mae = main(file_path)

print(f"Total spending for the current month: {current_month_spending}")
print(f"Forecasted spending for the next month: {forecasted_next_month_spending}")
print(f"Mean Squared Error (MSE): {mse}")
print(f"Mean Absolute Error (MAE): {mae}")
