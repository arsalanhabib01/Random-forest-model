// Import the Mongoose library
const mongoose = require('mongoose')

// Define a new schema for the predictions collection
const predictionSchema = new mongoose.Schema({
    prediction: {
        type: String, // Data type for the 'prediction' field
        required: true // This field is required
    },
    date: {
        type: String,
        required: true
      },
    time: {
        type: String,
        required: true
      },
      
  });
  // Export the schema as a Mongoose model named 'Predictions'
  module.exports = mongoose.model('Predictions', predictionSchema);
