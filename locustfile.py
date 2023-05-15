import json
from locust import HttpUser, task, between
import random

# This class defines three tasks:
class PredictionUser(HttpUser):
    # The wait_time attribute defines the amount of time to wait between each task. 
    wait_time = between(0.1, 0.5)
    host = "http://localhost:5000"

    @task(8) # 1st task with weight of 8 that means it will executed 8 times more then the other 2 tasks  
    def predict(self):
        input_data = [random.uniform(0, 1) for i in range(69)]
        # Send prediction request
        headers = {'Content-Type': 'application/json'}
        response = self.client.post('/predict', data=json.dumps({'data': input_data}), headers=headers)

        # Check that the response is valid JSON
        try:
            result = response.json()
        except json.JSONDecodeError:
            self.failure("Got an invalid response from the server")
            return
        
        # Check that the prediction is in the response
        if "prediction" not in result:
            self.failure("Got an invalid response from the server")
        else:
            self.success()

    @task(2)
    def DDoS(self):
        input_data = [1.22072175e-03, 3.87406638e-02, 2.27523003e-05, 0.00000000e+00,
       2.72031120e-05, 0.00000000e+00, 2.41740532e-04, 2.58064516e-03,
       1.00995527e-03, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00, 0.00000000e+00, 5.76092547e-03, 3.33333548e-01,
       7.74821256e-03, 2.45037389e-02, 3.87240628e-02, 1.49999983e-07,
       3.87405667e-02, 7.74811333e-03, 2.46147043e-02, 3.87239667e-02,
       1.33333320e-07, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       9.99855828e-01, 9.94591933e-01, 4.30212258e-07, 0.00000000e+00,
       4.14364641e-03, 2.41740532e-04, 1.79794521e-03, 0.00000000e+00,
       0.00000000e+00, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00, 1.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00, 0.00000000e+00, 1.79794521e-03, 1.00995527e-03,
       0.00000000e+00, 2.27523003e-05, 2.72031120e-05, 0.00000000e+00,
       0.00000000e+00, 3.92150879e-03, 0.00000000e+00, 2.34129530e-05,
       9.99999780e-01, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00]
        # Send prediction request
        headers = {'Content-Type': 'application/json'}
        response = self.client.post('/predict', data=json.dumps({'data': input_data}), headers=headers)

        # Check that the response is valid JSON
        try:
            result = response.json()
        except json.JSONDecodeError:
            self.failure("Got an invalid response from the server")
            return
        
        # Check that the prediction is in the response
        if "prediction" not in result:
            self.failure("Got an invalid response from the server")
        else:
            self.success()

    @task(1)
    def XSS(self):
        input_data = [1.22072175e-03, 4.32429551e-02, 9.10092010e-06, 3.42557258e-06,
       0.00000000e+00, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00, 0.00000000e+00, 5.76092175e-03, 3.33333462e-01,
       1.44143847e-02, 3.53207033e-02, 4.32357540e-02, 1.13333320e-06,
       4.32428583e-02, 2.16214292e-02, 4.34511294e-02, 4.32356583e-02,
       7.29999927e-06, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       9.99855827e-01, 9.94591970e-01, 1.92710049e-07, 9.63550245e-08,
       0.00000000e+00, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       1.00000000e+00, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00, 9.10092010e-06, 0.00000000e+00, 3.42557258e-06,
       0.00000000e+00, 4.45571899e-01, 4.41909790e-01, 0.00000000e+00,
       9.99999803e-01, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00, 0.00000000e+00, 0.00000000e+00, 0.00000000e+00,
       0.00000000e+00]
        # Send prediction request
        headers = {'Content-Type': 'application/json'}
        response = self.client.post('/predict', data=json.dumps({'data': input_data}), headers=headers)

        # Check that the response is valid JSON
        try:
            result = response.json()
        except json.JSONDecodeError:
            self.failure("Got an invalid response from the server")
            return
        
        # Check that the prediction is in the response
        if "prediction" not in result:
            self.failure("Got an invalid response from the server")
        else:
            self.success()
 

# Note: You must need to run server.py first and then 
# run this file "locust -f locustfile.py --headless -u 1000 -r 100"
