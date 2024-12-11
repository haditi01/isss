from flask import Flask, request, send_file, make_response, jsonify
from flask_cors import CORS, cross_origin
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from gtts import gTTS
import os
import uuid
import spending

app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = 'Content-Type'

# Function to generate content using GPT-2 model
def generate_content(topic):
    # Load pre-trained model and tokenizer
    print("gen_content")
    model_name = "gpt2-medium"
    tokenizer = GPT2Tokenizer.from_pretrained(model_name)
    model = GPT2LMHeadModel.from_pretrained(model_name)

    # Set up parameters for generating content
    max_length = 500
    temperature = 0.7
    top_p = 0.9
    top_k = 50
    num_paragraphs = 5  # Number of paragraphs to generate

    # Initialize variables for generated text and set for tracking unique paragraphs
    generated_text = ""
    unique_paragraphs = set()

    while len(unique_paragraphs) < num_paragraphs:
        # Generate content based on the topic
        prompt = f"Welcome to our podcast episode on financial planning strategies. Today, we dive into effective strategies for {topic}."
        inputs = tokenizer(prompt, return_tensors='pt')

        # Set pad_token_id to eos_token_id to avoid warnings about padding
        pad_token_id = tokenizer.eos_token_id

        # Generate output with specified parameters
        outputs = model.generate(
            inputs['input_ids'],
            max_length=max_length,
            num_return_sequences=1,
            temperature=temperature,
            top_p=top_p,
            top_k=top_k,
            pad_token_id=pad_token_id,
            attention_mask=inputs['attention_mask'],
            do_sample=True
        )

        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

        # Add unique paragraphs to the set
        unique_paragraphs.add(generated_text)

    print("gen_con_pod")  # Print after the loop completes
    # Return the joined unique paragraphs
    return "\n\n".join(unique_paragraphs)

# Function to generate speech from text using gTTS
def generate_speech(text, filename="output.mp3"):
    tts = gTTS(text=text, lang='en')  # Create a gTTS object with the text to be converted
    tts.save(filename)  # Save the speech to a file
    return filename  # Return the filename of the saved speech file

# Route to generate podcast
@app.route('/generate_podcast', methods=['POST'])
def generate_podcast():
    print("gen_podcast")
    data = request.json
    topic = data.get('topic')
    generated_content = generate_content(topic)
    filename = f"output_{uuid.uuid4()}.mp3"
    generate_speech(generated_content, filename)

    # Send file with headers for attachment
    response = make_response(send_file(filename, as_attachment=True))
    response.headers['Content-Disposition'] = f'attachment; filename={filename}'
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'

    return response

@app.route("/api/spending")
def spendings():
    # Specify the path to your CSV file
    file_path = './bankstat.csv'
    
    # Load the data and compute spending values
    data = spending.load_data(file_path)
    monthly_spending = spending.get_monthly_spending(data)
    current_month_spending = spending.get_current_month_spending(data)
    
    # Handle case where there's no current month data
    if current_month_spending == 0:
        specific_month = 1  # Example month
        specific_year = 2022  # Example year
        specific_month_data = data[(data['Month'] == specific_month) & (data['Year'] == specific_year)]
        current_month_spending = specific_month_data[specific_month_data['DrCr'] == 'Db']['amount'].sum()
    
    forecasted_next_month_spending, mse, mae = spending.forecast_next_month_spending(monthly_spending)
    
    # Create response data
    response_data = {
        "current_month_spending": current_month_spending,
        "forecasted_next_month_spending": forecasted_next_month_spending,
        "mse": mse,
        "mae": mae
    }
    
    return jsonify(response_data)
if __name__ == '__main__':
    app.run(debug=True)