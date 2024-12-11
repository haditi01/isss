import streamlit as st
import pandas as pd

# Load the scholarships data
scholarships_data = pd.read_csv('scholarships.csv')


# Function to filter scholarships based on user input
def recommend_scholarships(category, caste, gender, scholarship_type):
    filtered_scholarships = scholarships_data[
        (scholarships_data['Category'].str.contains(category, case=False)) &
        (scholarships_data['Caste'].str.contains(caste, case=False)) &
        (scholarships_data['Gender'].str.contains(gender, case=False)) &
        (scholarships_data['Type'].str.contains(scholarship_type, case=False))
        ]
    return filtered_scholarships


# Streamlit UI
st.set_page_config(page_title="Scholarship Recommendation", page_icon="🎓", layout="wide")
st.title("🎓 Scholarship Recommendation Chatbot")
st.header("Find the Best Scholarships for You!")

# Sidebar for user inputs
st.sidebar.title("User Input")
category = st.sidebar.selectbox("Select Category", ["Undergraduate", "Postgraduate", "Undergraduate/F"])
caste = st.sidebar.selectbox("Select Caste",
                             ["Open", "SC", "OBC", "EBC", "SC/ST", "Muslim, Sikh, Christian, Buddhist, Parsi"])
gender = st.sidebar.selectbox("Select Gender", ["All", "Male", "Female"])
scholarship_type = st.sidebar.selectbox("Select Type", ["General", "Science", "Science/Engineering"])

# Button to get recommendations
if st.sidebar.button("Get Recommendations"):
    recommendations = recommend_scholarships(category, caste, gender, scholarship_type)

    if not recommendations.empty:
        st.subheader("Recommended Scholarships:")
        for index, row in recommendations.iterrows():
            # Display scholarship information in a card-like format
            with st.container():
                st.markdown(
                    f"""
                    <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                        <h4 style="color: #4CAF50;">{row['Scholarship Name']}</h4>
                        <p><strong>Category:</strong> {row['Category']}</p>
                        <p><strong>Caste:</strong> {row['Caste']}</p>
                        <p><strong>Gender:</strong> {row['Gender']}</p>
                        <p><strong>Type:</strong> {row['Type']}</p>
                        <p><a href="{row['Link to Apply']}" target="_blank" style="color: #1E88E5;">Link to Apply</a></p>
                    </div>
                    """, unsafe_allow_html=True
                )
    else:
        st.warning("No scholarships found matching your criteria.")

# Footer
st.markdown("---")
st.write("For more information, feel free to contact us at: [your_email@example.com](mailto:your_email@example.com)")
