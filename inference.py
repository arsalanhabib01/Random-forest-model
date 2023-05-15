import pickle
import numpy as np
import random


# Load the trained model from the pickle file
with open("C:/Users/habibars/Downloads/Network monitoring/intrusion_detection/random_forest_model.pkl", 'rb') as f:
    model = pickle.load(f)

# Define the infer method
def infer(data):
    
    # Reshape the data to ensure it has the correct shape
    data = np.reshape(data, (1, -1))

    # Use the trained model to make a prediction on the input data
    prediction = model.predict(data)

    # Return the predicted class (e.g. "BENIGN" or "Attack")
    return prediction[0]


if __name__ == '__main__':
    # Note: Only take input when you run the file individually 
    # Generate a list of 69 random numbers between 0 and 1
    data = [random.uniform(0, 1) for _ in range(69)]

    prediction = infer(data)
    print(prediction)

# Note: Command to run the file "python inference.py"


