
// const path = require('path')

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const fetch = require("node-fetch");

module.exports = app

const dotenv = require('dotenv');
dotenv.config()

const geoNamesURL = 'http://api.geonames.org/searchJSON';
const geoNamesKey = process.env.GEONAMES_KEY;
const weatherbitURL = 'http://api.weatherbit.io/v2.0/forecast/daily';
const weatherbitKey = process.env.WEATHERBIT_KEY;

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

// GET route that calculate weather info based on city
app.get('/getWeatherInfo', function(req, res) {
    travelData = {
        departure: req.body.cityFrom,
        arrival: req.body.cityTo,
        date: req.body.departureDate,
    };
    getCity(travelData.arrival)
        .then((cityInfo) => {
            const latitude = cityInfo.geonames[0].lat;
            const longitude = cityInfo.geonames[0].lng;
            return getWeather(latitude, longitude, travelData.date)
        })
        .then((weatherInfo) => {
            res.send(weatherInfo)
        })
});


// Function to get geonames API data
const getCity = async(city) => {
    const url = `${geoNamesURL}?q=${encodeURIComponent(city)}&username=${geoNamesKey}&maxRows=1`;
    const res = await fetch(url);
    try {
        const userData = await res.json();
        return userData;
    } catch(error) {
        console.log('error', error);
    }
}

//Function to get weatherbit API data
const getWeather = async (lat, lon) => {
    const res = await fetch(`${weatherbitURL}?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&key=${weatherbitKey}`);
    try {
        const userData = await res.json();
        return userData;
    } catch(error) {
        console.log('error', error);
    }
}