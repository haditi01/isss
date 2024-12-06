import streamlit as st
import pandas as pd
import os

# Set the page configuration
st.set_page_config(
    page_title="Course Recommendation Chatbot",
    page_icon="🎓",
    layout="centered",
    initial_sidebar_state="auto"
)

# Load course data from CSV file with error handling
file_path = os.path.join(os.path.dirname(__file__), 'courses.csv')
try:
    courses_data = pd.read_csv(file_path)
except FileNotFoundError:
    st.error(f"File not found: {file_path}. Please ensure it exists.")
    st.stop()

# Function to recommend courses based on user-selected category
def recommend_courses(category):
    if category:
        filtered_courses = courses_data[courses_data['Category'].str.contains(category, case=False, na=False)]
        return filtered_courses
    return courses_data  # Return all courses if no filter is applied

# Streamlit UI elements
st.title("Course Recommendation Chatbot")
st.write("Please select a course category you're interested in:")

# Dropdown for course categories
category_options = courses_data['Category'].dropna().unique().tolist()
if not category_options:
    st.error("No categories found in the CSV file.")
    st.stop()

category_input = st.selectbox("Select a Course Category", category_options)

# Button to get recommendations
if st.button("Get Recommendations"):
    recommended_courses = recommend_courses(category_input)

    if not recommended_courses.empty:
        st.write("### Recommended Courses:")
        for index, row in recommended_courses.iterrows():
            st.markdown(f"**Course Name:** [{row['Course Name']}]({row['Link to Course']})")
            st.write(f"**Provider:** {row['Provider']}")
            st.write("")  # Add an empty line for better spacing
    else:
        st.write("No courses found for the selected category.")

# Footer
st.write("### Course Categories:")
st.write("Some popular categories include Programming, Data Science, Machine Learning, and AI.")
