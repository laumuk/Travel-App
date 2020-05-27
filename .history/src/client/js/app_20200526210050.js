// // /* Global Variables */

const addButton = document.querySelector('.link');
const printButton = document.getElementById('print');
const removeButton = document.getElementById('remove');
const cityTo = document.querySelector('input[name="to"]');
const cityFrom = document.querySelector('input[name="from"]');
const departureDate = document.querySelector('input[name="date"]');
const baseUrl = 'http://localhost:8081';
const departureDate = document.querySelector('input[name="date"]');
const oneDaySeconds = 24 * 60 * 60;
const dateNow = Date.now() / 1000;
const timeInput = (new Date(departureDate).getTime()) / 1000;

//adding travel planner listener
addButton.addEventListener('click', function (e) {
    e.preventDefault();
    travel_planner.scrollIntoView({ block: 'start', behavior: 'smooth' });
})

document.getElementById('travel_form').addEventListener('submit', function (e) {
    e.preventDefault();
    submitForm();
})

//adding print listener
printButton.addeventListener('click', function (e) {
    window.print();
})

//adding a remove listener
removeButton.addEventListener('click', function (e) {
    form.reset();
})

// Getting info, posting it to the server, fetching data
function submitForm() {
    const data = {
        cityFrom: cityFrom.value,
        cityTo: cityTo.value,
        date: departureDate.value
    } 
    postData(`${baseUrl}/add`, data).then(console.log)
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

// // // Update UI dinamically
// // const updateUI = async () => {
// //     const request = await fetch('/all');
// //     try {
// //         const allData = await request.json();
// //         document.getElementById('date').innerHTML = allData.date;
// //         document.getElementById('temp').innerHTML = allData.temperature;
// //         document.getElementById('content').innerHTML = allData.userResponse;
// //     } catch (error) {
// //         console.log('error', error);
// //     }
// // }

// // Creating the event listener
// // document.getElementById('generate').addEventListener('click', submitForm);

// // // Create a new date instance dynamically with JS
// // let d = new Date();
// // let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// // export { submitForm }