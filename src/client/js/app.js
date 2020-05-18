/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'b8d471c58b12e06b48ef461ebd58799a';

// Getting weather info, posting it to the server, fetching data
function submitForm() {
    const zip = document.getElementById('zip').value;
    getWeather(baseURL, zip, apiKey)
        .then(function(weatherResult) { 
            postData("/add", {
                'temperature': weatherResult.main.temp,
                'date': newDate,
                'userResponse': document.getElementById('feelings').value
            })
        })
        .then(updateUI);
}

// Function to get WEB API data
const getWeather = async(baseURL, zip, apiKey) => {
    const res = await fetch(`${baseURL}?zip=${zip}&appid=${apiKey}`);
    try {
        const userData = await res.json();
        return userData;
    } catch(error) {
        console.log('error', error);
    }
}

// Function to POST data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

// Update UI dinamically
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.userResponse;
    } catch (error) {
        console.log('error', error);
    }
}

// Creating the event listener
document.getElementById('generate').addEventListener('click', submitForm);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();