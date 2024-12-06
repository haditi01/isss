import streamlit as st
import pandas as pd

# Set the page configuration to change the theme
st.set_page_config(
    page_title="Course Recommendation Chatbot",
    page_icon="🎓",
    layout="centered",
    initial_sidebar_state="auto"
)

# Load course data from CSV file
courses_data = pd.read_csv('src/components/backend/courses.csv')


# Function to recommend courses based on user-selected category
def recommend_courses(category):
    if category:
        filtered_courses = courses_data[courses_data['Category'].str.contains(category, case=False)]
        return filtered_courses
    return courses_data  # Return all courses if no filter is applied


# Custom CSS for styling
st.markdown(
    """
    <style>
    body {
        background-color: white;  /* Set the body background to white */
    }
    h1, h2, h3, h4, h5, h6 {
        color: #333;  /* Dark text color for better contrast */
    }
    </style>
    """,
    unsafe_allow_html=True
)

# Streamlit UI elements
st.title("Course Recommendation Chatbot")
st.write("Please select a course category you're interested in:")

# Dropdown for course categories
category_options = courses_data['Category'].unique().tolist()
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

#streamlit run course_chatbot.py