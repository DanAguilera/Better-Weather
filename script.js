const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <div class="temp">High - ${day.temp.day}&#176;F</div>
                <div class="temp">Low - ${day.temp.night}&#176;F</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">High - ${day.temp.day}&#176;F</div>
                <div class="temp">Low - ${day.temp.night}&#176;F</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}
// const timeEL = document.getElementById("time");
// const dateEl = document.getElementById("date");
// const currentWeatherItemsEl = document.getElementById("current-weather-items");
// const timeZone = document.getElementById("time-zone");
// const countryEl = document.getElementById("country");
// const weatherForecastEl = document.getElementById("weather-forecast");
// const currentTempEl = document.getElementById("current-temp");
// // made the days and months into an array
// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday']
// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// // brought the API key from the betterweatherAPI
// const API_KEY = "b233eddce251ebbffb3969ee0e29942b";

// setInterval(() => {
//     const time = new Date();
//     const month = time.getMonth();
//     const date = time.getDate();
//     const day = time.getDay();
//     const hour = time.getHours();
//     const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
//     // had to use the "pad start" because my isuue, was the 0 wouldnt show up
//     const minutes = String(time.getMinutes()).padStart(2,'0');
//     const ampm = hour >= 12 ? "PM" : "AM";

//     timeEL.innerHTML = hoursIn12HrFormat + ":" + minutes + "" + `<span id="am-pm">${ampm}</span>`

//     dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

// }, 1000);

// getWeatherData()
// function getWeatherData () {
//     navigator.geolocation.getCurrentPosition((success) => {
//         console.log(success);

//         let {latitude, longitude} = success.coords;

//         fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {
//             console.log(data)
//         showWeatherData(data);
//         })
//     })
// }

// function showWeatherData(data)  {
//     let{humidity, pressure, sunrise, sunset, wind_speed} = data.current;
// // template literals to pull in the info from the API thats found in the console
//     currentWeatherItemsEl.innerHTML = 
//     `<div class="weather-items">
//     <div>Humidity :</div>
//     <div>${humidity} %</div>
//     </div>
//     <div class="weather-items">
//     <div>Wind Speed :</div>
//     <div>${wind_speed} mph</div>
//     </div>
//     <div class="weather-items">
//     <div>Sunrise :</div>
//     <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
//     </div>
//     <div class="weather-items">
//     <div>Sunset :</div>
//     <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
//     </div>`;

//     let otherDayForecast
// data.daily.forEach((d, idx) => {
//     if(idx == 0){
//         currentTempEl.innerHTML =`
//         <div class="today" id="current-temp">
//                 <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
//                 <div class="other">
//                     <div class="day">Monday</div>
//                     <div class="temp">Night - ${day.temp.night}&#176; C</div>
//                     <div class="temp">Day - ${day.temp.day}&#176; C</div>
//                 </div>
                
//             </div>`
//     }else{
//         otherDayForecast += `
//         <div class="weather-forecast-item">
//             <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
//             <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
//             <div class="temp">Night - ${day.temp.night}&#176; C</div>
//             div class="temp">Day - ${day.temp.day}&#176; C</div>
//         </div>`
        
//     }
// })

// weatherForecastEl.innerHTML = otherDayForecast
// }

