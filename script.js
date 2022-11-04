const timeEL = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timeZone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");
// made the days and months into an array
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// brought the API key from the betterweatherAPI
const API_KEY = "b233eddce251ebbffb3969ee0e29942b";

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
    // had to use the "pad start" because my isuue, was the 0 wouldnt show up
    const minutes = String(time.getMinutes()).padStart(2,'0');
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
    let{humidity, pressure, sunrise, sunset, wind_speed} = data.current;
// template literals to pull in the info from the API thats found in the console
    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-items">
    <div>Humidity :</div>
    <div>${humidity} %</div>
    </div>
    <div class="weather-items">
    <div>Wind Speed :</div>
    <div>${wind_speed} mph</div>
    </div>
    <div class="weather-items">
    <div>Sunrise :</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-items">
    <div>Sunset :</div>
    <div>${window.moment(sunset * 1000).format('HH:mm ')} pm</div>
    </div>`;
}