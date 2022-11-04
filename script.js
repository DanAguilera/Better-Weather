const timeEL = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timeZone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Firday', 'Sunday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = "b233eddce251ebbffb3969ee0e29942b";

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";

    timeEL.innerHTML = hoursIn12HrFormat + ":" + minutes + "" + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
        showWeatherData(data);
        })
    })
}

function showWeatherData(data)  {
    
}