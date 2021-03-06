// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const path = require('path');

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const fetch = require("node-fetch");

module.exports = app

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

//GET route
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

//POST route that adds data
app.post('/add', function(req, res) {
    projectData = {
        cityFrom: req.body.cityFrom,
        cityTo: req.body.cityTo,
        departureDate: req.body.departureDate,
        weather: req.body.weather,
        summary: req.body.summary,
        daysLeft: req.body.daysLeft
    };
    res.status(201).send(projectData);
});

module.exports = app
