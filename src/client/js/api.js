const babel_polyfill = require('babel-polyfill');
//API URL + Keys
const geoNamesURL = 'http://api.geonames.org/searchJSON';
const geoNamesKey = 'laura_bobrovacz';
const weatherbitURL = 'http://api.weatherbit.io/v2.0/forecast/daily';
const weatherbitKey = 'ee7ca3aeaa18472ca69ac88987786a1e';
const pixabayURL = 'https://pixabay.com/api/';
const pixabayKey = '16761883-7374e77fbd0ded9dfd0efe123';

const oneDaySeconds = 24 * 60 * 60;

// Function to get geonames API data
export const getCity = async(city) => {
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
export const getWeather = async (lat, lon) => {
    const url = `${weatherbitURL}?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&key=${weatherbitKey}`;
    const res = await fetch(url);
    try {
        const weatherData = await res.json();
        return weatherData;
    } catch(error) {
        console.log('error', error);
    }
}

// Function to get Pixabay API data
export const getImage = async(city) => {
    const url = `${pixabayURL}?key=${pixabayKey}&q=${encodeURIComponent(city)}+city&image_type=photo`;
    const res = await fetch(url);
    try {
        const imageData = await res.json();
        return imageData.hits[0].webformatURL;
    } catch(error) {
        console.log('error', error);
    }
}

//Getting date
export const getWeatherForDate = (weatherData, day) => {
    const diff = calcDayDiff(day, new Date())
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

export const calcDayDiff = (date1, date2) => {
    return Math.ceil((date1.getTime() - date2.getTime()) / (1000 * oneDaySeconds))
}