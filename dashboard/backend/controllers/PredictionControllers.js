// Import the PredictionModel from the 'models' directory
const PredictionModel = require('../models/PredictionModel')

// Define an asynchronous function to get all predictions from the database
module.exports.getPredictions = async (req, res) => {
    // Use the 'find' method on the PredictionModel to retrieve all predictions
    const predictions = await PredictionModel.find();
    // Send the retrieved predictions as the response to the client
    res.send(predictions);
};
