// Import the 'Router' class from the 'express' library
const {Router} = require('express');

// Import the 'getPredictions' function from the 'PredictionControllers' module
const { getPredictions } = require('../controllers/PredictionControllers');

// Create a new instance of the 'Router' class
const router = Router();

// Define a route that responds to GET requests for '/get'
router.get('/get', getPredictions);

// Export the router instance for use in other modules
module.exports = router;
