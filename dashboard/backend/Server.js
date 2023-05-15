// Importing required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

// Importing application routes
const routes = require('./routes/PredictionRoute')

// Creating an instance of Express application
const app = express();

// Setting the port number
const PORT = process.env.PORT || 5000;

// Adding middleware to parse request bodies in JSON format
app.use(express.json());

// Adding middleware to enable cross-origin resource sharing (CORS)
app.use(cors());

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log(err));

// Mounting application routes
app.use('/api', routes);

// Starting the server and listening for incoming requests
app.listen(PORT, () => console.log(`Listening at ${PORT}`));


// Note: Command to run the backend "npm run dev"
