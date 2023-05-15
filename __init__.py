from pymongo import MongoClient

# Connect to the MongoDB server
client = MongoClient('mongodb+srv://username:password@cluster0.ssw26.mongodb.net/?retryWrites=true&w=majority')
# Name of the database is 'mydatabase'
db = client['PREDICTION_DB']
# Name of the collection is 'predictions'
collection = db['predictions']
