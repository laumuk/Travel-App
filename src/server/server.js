// Setup empty JS object to act as endpoint for all routes
projectData = {};

const path = require('path')

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 8081;
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
}

//GET route
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

//POST route that adds data
app.post('/add', function(req, res) {
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    };
});


    
