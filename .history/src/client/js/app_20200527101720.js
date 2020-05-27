// // /* Global Variables */

const addButton = document.querySelector('.link');
const printButton = document.getElementById('print');
const removeButton = document.getElementById('remove');
const form = document.getElementById('travel_form');
const cityTo = document.querySelector('input[name="to"]');
const cityFrom = document.querySelector('input[name="from"]');
const departureDate = document.querySelector('input[name="date"]');
const geoNamesURL = 'http://api.geonames.org/searchJSON';
const geoNamesKey = 'laura_bobrovacz';
const weatherbitURL = 'http://api.weatherbit.io/v2.0/forecast/daily';
const weatherbitKey = 'ee7ca3aeaa18472ca69ac88987786a1e';
const baseUrl = 'http://localhost:8081';
const oneDaySeconds = 24 * 60 * 60;
const timeInput = (new Date(departureDate.value).getTime()) / 1000;

//adding travel planner listener
addButton.addEventListener('click', function (e) {
    e.preventDefault();
    travel_planner.scrollIntoView({ block: 'start', behavior: 'smooth' });
})

//submit form
document.getElementById('travel_form').addEventListener('submit', function (e) {
    e.preventDefault();
    submitForm();
})

//adding print listener
printButton.addEventListener('click', function (e) {
    window.print();
})

//adding a remove listener
removeButton.addEventListener('click', function (e) {
    e.preventDefault();
    form.reset();
    document.getElementById('result').style.display = "none"
})

// Getting info, posting it to the server, fetching data
submitForm = async () => {
    travelData = {
        departure: cityFrom.value,
        arrival: cityTo.value,
        date: departureDate.value,
    };
    getCity(travelData.arrival)
        .then((cityInfo) => {
            const latitude = cityInfo.geonames[0].lat;
            const longitude = cityInfo.geonames[0].lng;
            return getWeather(latitude, longitude)
        })
        .then((weatherInfo) => {
            const weatherForDay = getWeatherForDate(weatherInfo.data, travelData.date)
            const dayDiff = Math.ceil((new Date(travelData.date).getTime() - Date.now()) / (1000 * oneDaySeconds))
            updateUI(travelData.departure, travelData.arrival, weatherForDay, travelData.date, dayDiff)
        });
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
const updateUI = (cityFrom, cityTo, weatherData, date, dayDiff) => {
    document.getElementById('result').style.display = "block";
    document.getElementById('city').innerHTML = cityTo;

    
}

const getWeatherForDate = (weatherData, day) => {
    const diff = Math.ceil((day.getTime() - Date.now()) / (1000 * oneDaySeconds))

    if (diff < 0) {
        // Poor man's error handling: return today's if date is in the past
        return weatherData[0];
    } else if (diff > 15) {
        // Poor man's error handling: return last' if date is too far in the future
        return weatherData[15];
    } else {
        return weatherData[diff];
    }
} 


// Function to get geonames API data
const getCity = async(city) => {
    const url = `${geoNamesURL}?q=${encodeURIComponent(city)}&username=${geoNamesKey}&maxRows=1`;
    console.log(url)
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
    const url = `${weatherbitURL}?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&key=${weatherbitKey}`;
    console.log(url)
    const res = await fetch(url);
    try {
        const weatherData = await res.json();
        return weatherData;
    } catch(error) {
        console.log('error', error);
    }
}