import json
import time 
from flask import Flask, request, jsonify, render_template
from inference import infer
from __init__ import collection
from datetime import datetime
from bson import json_util

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    data = request.get_json()
    input_data = data['data']

    # Starting time
    start = time.time() 

    # Call the inference function to get the prediction
    prediction = infer(input_data)
    
    # Ending time
    end = time.time()

    #  Calculate the duration of the inference process
    time_result = end - start

    # Create a JSON object with the prediction and the current date
    now = datetime.now()
    current_date = now.strftime("%Y-%m-%d %H:%M:%S")
    output = {'prediction': prediction, 'date': current_date, 'time': time_result}
    
    # Convert the _id field in each document from ObjectId to JSON-compatible format
    json_data = json.loads(json_util.dumps(output))
    # Insert the prediction into the MongoDB collection
    collection.insert_one(json_data)

    # Return the JSON object
    return jsonify(output)

# http://localhost:5000/predictions
@app.route('/predictions')
def prediction():
    # Find all the documents in the collection
    cursor = collection.find({})
    # Convert the cursor to a list of dictionaries
    predictions = list(cursor)
    # Convert the _id field in each document from ObjectId to JSON-compatible format
    predictions_json = json.loads(json_util.dumps(predictions))
    # Render the 'predictions.html' template with the predictions as a context variable
    return render_template('predictions.html', predictions=predictions_json)

# http://localhost:5000
@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)

# Note: Command to run the file "python server.py"
