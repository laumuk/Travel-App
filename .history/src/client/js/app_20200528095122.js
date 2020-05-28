import { getCity } from './api.js'
import { getWeather } from './api.js'
import { getImage } from './api.js'
import { getWeatherForDate } from './api.js'

//Global Variables
const addButton = document.getElementById('link');
const printButton = document.getElementById('print');
const removeButton = document.getElementById('remove');
const travelPlanner = document.getElementById('travel_planner');
const form = document.getElementById('travel_form');
const cityFrom = document.getElementById('city_from');
const cityTo = document.getElementById('city_to');
const departureDate = document.getElementById('dep_date');
const baseUrl = 'http://localhost:8081';
const oneDaySeconds = 24 * 60 * 60;
const timeInput = (new Date(departureDate.value).getTime()) / 1000;

//Adding travel planner listener
const addTrip = addButton.addEventListener('click', function (e) {
    e.preventDefault();
    travel_planner.scrollIntoView({ block: 'start', behavior: 'smooth' });
})

//Submit form
form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitForm();
})

//Adding print listener
printButton.addEventListener('click', function (e) {
    window.print();
})

//Adding a remove listener
removeButton.addEventListener('click', function (e) {
    e.preventDefault();
    form.reset();
    document.getElementById('result').style.display = "none"
})

// Getting travel info
const submitForm = async () => {
    const travelData = {
        departure: cityFrom.value,
        arrival: cityTo.value,
        date: new Date(departureDate.value),
    };
    getCity(travelData.arrival)
        .then((cityInfo) => {
            const latitude = cityInfo.geonames[0].lat;
            const longitude = cityInfo.geonames[0].lng;
            return getWeather(latitude, longitude)
        })
        .then((weatherInfo) => {
            const weatherForDay = getWeatherForDate(weatherInfo.data, travelData.date)
            const dayDiff = Math.ceil((travelData.date.getTime() - Date.now()) / (1000 * oneDaySeconds))
            updateUI(travelData.departure, travelData.arrival, weatherForDay, travelData.date, dayDiff)
        })
}

// Function to POST data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

// Update UI dinamically
const updateUI = async (cityFrom, cityTo, weatherData, date, dayDiff, Pixabaypic) => {
    const imageUrl = await getImage(cityTo)

    document.getElementById('from_city').innerHTML = cityFrom;
    document.getElementById('to_city').innerHTML = cityTo;
    document.getElementById('exact_date').innerHTML = date.toDateString();
    document.getElementById('days').innerHTML = dayDiff;
    document.getElementById('temp_high').innerHTML = weatherData.max_temp;
    document.getElementById('temp_low').innerHTML = weatherData.low_temp;
    document.getElementById('forecast').innerHTML = weatherData.weather.description;
    document.getElementById('pixabay').setAttribute('src', imageUrl)
    
    document.getElementById('result').style.display = "block";
    result.scrollIntoView({ behavior: "smooth" });  
}

export { addTrip }
export { submitForm }