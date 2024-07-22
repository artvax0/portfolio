const key = `7c20d82b68eb90db48e68d108925b614`;
/*
let units = 'metric';
let theme = 'light'

function loadSettings() {
    let data = JSON.parse(localStorage.getItem('settings')) || { units: 'metric', theme: 'light' };
    
    if (data.units == 'imperials') {
        units = 'imperials';
    }
    if (data.theme == 'dark') {
        theme = 'dark';
    }
}

function changeSettings() {

}

function saveSettings() {
    let data = { units: units, theme: theme };
    localStorage.setItem('settings', JSON.stringify(data));
}

*/
async function weatherAPIHandler(cityName) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`);
        let weatherData = await response.json();

        console.log(weatherData);

        displayWeatherInfo(weatherData);
        forecastAPIHandler(weatherData);
        pullutionAPIHandler(weatherData);
    } catch (error) {
        console.log(error);
    }
}

async function forecastAPIHandler(weatherData) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${key}&units=metric`);
        let forecastData = await response.json();

        console.log(forecastData);
        displayForecastInfo(forecastData);
    } catch (error) {
        console.log(error);
    }
}

async function pullutionAPIHandler(weatherData) {
    try {
        let response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${key}`)
        let pollutionData = await response.json();
        
        displayPullutionInfo(pollutionData);
} catch (error) {
        console.log(error);
    }
}

function displayWeatherInfo(weatherData) {
    // Variables
    const city = document.getElementById('city');
    const temp = document.getElementById('temperature');
    const currentTemp = document.getElementById('current-temp');
    const feelsLike = document.getElementById('feels-like');
    const windSpeed = document.getElementById('wind-speed');
    const humidity = document.getElementById('humidity');
    const pressure = document.getElementById('pressure');
    const maxTemp = document.getElementById('max-temp');
    const minTemp = document.getElementById('min-temp');
    const weatherDescription = document.getElementById('weather-description');
    const weatherIcon = document.getElementById('weather-icon');
    const sunrise = document.getElementById('sunrise');
    const time = document.getElementById('time');
    const sunset = document.getElementById('sunset');

    city.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
    // get one decimal digit after
    temp.innerText = `${Math.round(weatherData.main.temp * 10) / 10}°`;
    currentTemp.innerText = `Current Temp: ${Math.round(weatherData.main.temp * 10) / 10}°`;
    feelsLike.innerText = `${Math.round(weatherData.main.feels_like * 10) / 10}°`;

    maxTemp.innerText = `${Math.round(weatherData.main.temp_max * 10) / 10}°`;
    minTemp.innerText = `${Math.round(weatherData.main.temp_min * 10) / 10}°`;

    /* GAGUE SYSTEM */
    const tempGague = document.getElementById('gague');
    const sunGague = document.getElementById('sun-gague')

    // calculate percentage of current temp based on dynamic min-max temps 
    let progress = (((Math.round(weatherData.main.temp * 10) / 10 - Math.round(weatherData.main.temp_min * 10) / 10) * 100) / (Math.round(weatherData.main.temp_max * 10) / 10 - Math.round(weatherData.main.temp_min * 10) / 10));
    console.log(`temp gague percentage: ${progress}`);
    
    // calculate percentage of current time based on dynamic sunrise and sunset
    let sunProgress = ((weatherData.dt - weatherData.sys.sunrise) / (weatherData.sys.sunset - weatherData.sys.sunrise));
    console.log(sunProgress);
    
    function setProgress(tempPercent, sunPercent) {
        tempGague.style.width = `${tempPercent}%`;
        if (sunPercent > 1) {
            sunGague.style.width = `100%`;
        } else if (sunPercent < 0) {
            sunGague.style.width = `0%`;
        } else {
            sunGague.style.width = `${sunPercent * 100}%`
        }
    }

    setProgress(progress, sunProgress);

    weatherDescription.innerText = `${weatherData.weather[0].main}, ${weatherData.weather[0].description}`;
    weatherIcon.src = `./images/${weatherData.weather[0].icon}.svg`;

    windSpeed.innerText = `${weatherData.wind.speed}`;

    humidity.innerText = `${weatherData.main.humidity}%`;
    pressure.innerText = `${weatherData.main.pressure} hPa`;

    function localDate(sunTime) {
        let timeData = new Date(sunTime * 1000 + weatherData.timezone * 1000).toUTCString();
        return timeData.slice(17, 22);
    }

    sunrise.innerText = localDate(weatherData.sys.sunrise);
    time.innerText = `Last Update: ${localDate(weatherData.dt)}`;
    sunset.innerText = localDate(weatherData.sys.sunset);
}

function displayForecastInfo(forecastData) {
    const h1Time = document.getElementById('h1-time');
    const h4Time = document.getElementById('h4-time');
    const h7Time = document.getElementById('h7-time');
    const h10Time = document.getElementById('h10-time');
    const h13Time = document.getElementById('h13-time');
    const h1Icon = document.getElementById('h1-icon');
    const h4Icon = document.getElementById('h4-icon');
    const h7Icon = document.getElementById('h7-icon');
    const h10Icon = document.getElementById('h10-icon');
    const h13Icon = document.getElementById('h13-icon');
    const h1Temp = document.getElementById('h1-temp');
    const h4Temp = document.getElementById('h4-temp');
    const h7Temp = document.getElementById('h7-temp');
    const h10Temp = document.getElementById('h10-temp');
    const h13Temp = document.getElementById('h13-temp');

    function localDate(forecast) {
        let timeData = new Date(forecast.dt * 1000 + forecastData.city.timezone * 1000).toUTCString();
        return timeData.slice(17, 22);
    }

    h1Time.innerText = localDate(forecastData.list[0]);
    h4Time.innerText = localDate(forecastData.list[1]);
    h7Time.innerText = localDate(forecastData.list[2]);
    h10Time.innerText = localDate(forecastData.list[3]);
    h13Time.innerText = localDate(forecastData.list[4]);

    h1Icon.src = `./images/${forecastData.list[0].weather[0].icon}.svg`;
    h4Icon.src = `./images/${forecastData.list[1].weather[0].icon}.svg`;
    h7Icon.src = `./images/${forecastData.list[2].weather[0].icon}.svg`;
    h10Icon.src = `./images/${forecastData.list[3].weather[0].icon}.svg`;
    h13Icon.src = `./images/${forecastData.list[4].weather[0].icon}.svg`;

    h1Temp.innerText = `${forecastData.list[0].main.temp}°`
    h4Temp.innerText = `${forecastData.list[1].main.temp}°`
    h7Temp.innerText = `${forecastData.list[2].main.temp}°`
    h10Temp.innerText = `${forecastData.list[3].main.temp}°`
    h13Temp.innerText = `${forecastData.list[4].main.temp}°`
}

function displayPullutionInfo(pollutionData) {
    const pollutionScore = document.getElementById('pollution-score');
    console.log(pollutionData);
    switch (pollutionData.list[0].main.aqi) {
        case 1:
            pollutionScore.innerText = `Air quality level is good, enjoy your day`;
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-1', 'rgba(124, 221, 178, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-2', 'rgba(108, 221, 133, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-3', 'rgba(45, 227, 103, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-4', 'rgba(10, 181, 16, .8)');
            break;

        case 2:
            pollutionScore.innerText = `Air quality level is fair, stay wary of polluted areas`;
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-1', 'rgba(169, 221, 124, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-2', 'rgba(116, 221, 108, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-3', 'rgba(155, 227, 45, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-4', 'rgba(90, 181, 10, .8)');
            break;

        case 3:
            pollutionScore.innerText = `Air quality is moderate, avoid polluted areas`
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-1', 'rgba(219, 221, 124, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-2', 'rgba(208, 221, 108, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-3', 'rgba(223, 227, 45, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-4', 'rgba(169, 181, 10, .8)');
            break;

        case 4:
            pollutionScore.innerText = `Air quality is poor, avoid going to low levels unless necessary`;
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-1', 'rgba(221, 183, 124, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-2', 'rgba(221, 117, 108, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-3', 'rgba(227, 156, 45, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-4', 'rgba(181, 106, 10, .8)');
            break;
    
        default:
            pollutionScore.innerText = `Air quality is very poor, wear a mask outside`;
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-1', 'rgba(221, 124, 124, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-2', 'rgba(221, 108, 108, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-3', 'rgba(227, 45, 45, .8)');
            document.querySelector(':root').style.setProperty('--pollution-widget-bgc-4', 'rgba(181, 10, 10, .8)');
            break;
    }
}

document.getElementById('search-city').addEventListener('click', () => {
    weatherAPIHandler(document.getElementById('input-city').value);
});

document.getElementById('settings-btn').addEventListener('click', () => {
    document.getElementById('popup-settings').style.display = `flex`;
});

document.getElementById('close-settings').addEventListener('click', () => {
    document.getElementById('popup-settings').style.display = `none`;
});