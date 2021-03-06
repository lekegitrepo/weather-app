import './scss/app.scss';
// import {videos} from '../bg-video/waves.mp4';

const input = document.getElementById('location');
const btn = document.getElementById('submit-loc');
const btnCelsius = document.getElementById('celsius');
const btnFahren = document.getElementById('fahrenheit');
const loader = document.getElementById('loader-container');

const weatherIcon = document.getElementById('weather-icon');
const infoContainer = document.getElementById('info-container');

const locationInfo = document.querySelectorAll('.location > div');
const tempInfo = document.querySelectorAll('.temp-info > div');
const weatherInfo = document.querySelectorAll('.weather-status-info > div');
const windSpeedInfo = document.querySelectorAll('.wind-speed-info > div');
const dateInfo = document.getElementById('date');

const errorDiv = document.createElement('div');

let dataHub = null;
const date = new Date();

async function fetchWeatherApi(location) {
  errorDiv.innerHTML = '';
  try {
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=3200d53ac65b442eb5f439f5613ee06c`);
    const resp = await api.json();
    console.log(resp);
    return resp;
  } catch (err) {
    console.log('error: unable to fetch weather info');
    loader.style.display = 'none';
    errorDiv.innerHTML = `<h2>Unable to find weather info of ${input.value}</h2>`;
    infoContainer.appendChild(errorDiv);
  }
}

async function getWeatherInfo() {
  const info = await fetchWeatherApi(input.value);
  console.log(info);
  try {
    dataHub = getJSON(info);
    displayWeatherInfo(dataHub);
    loader.style.display = 'none';
    input.value = '';
  } catch (err) {
    loader.style.display = 'none';
    console.log('Unable to find weather info');
    loader.style.display = 'none';
    errorDiv.innerHTML = `<h2>Unable to find weather info of ${input.value}</h2>`;
    infoContainer.appendChild(errorDiv);
  }
}

const getJSON = (jsonData) => {
  const location = () => {
    const [city, country] = [jsonData.name, jsonData.sys.country];
    return { city, country };
  };

  const temp = () => {
    const {
      temp, temp_min, temp_max, feels_like, pressure, humidity,
    } = jsonData.main;
    return {
      temp,
      humidity,
      pressure,
      feels_like,
      temp_min,
      temp_max,
    };
  };

  const weather = () => {
    const { main, description, icon } = jsonData.weather[0];
    return {
      main,
      description,
      icon,
    };
  };

  const wind = () => {
    const { speed, deg } = jsonData.wind;
    return { speed, deg };
  };

  const coordinate = () => {
    const { lon, lat } = jsonData.coord;
    return { lon, lat };
  };

  return {
    location,
    temp,
    weather,
    wind,
    coordinate,
  };
};

const displayWeatherInfo = (info) => {
  locationInfo[0].innerHTML = `
  <span class= "title">City:</span>
  <span class="value">${info.location().city}</span>`;

  locationInfo[1].innerHTML = `<span class= "title">Country: </span>
  <span class="value">${info.location().country}</span>`;

  locationInfo[2].innerHTML = `<div class="title">Longitude: <span class="value">${info.coordinate().lon}</span></div>
  <div class="title">Latitude: <span class="value">${info.coordinate().lat}</span></div>`;

  weatherIcon.src = `http://openweathermap.org/img/wn/${info.weather().icon}@2x.png`;
  weatherInfo[0].innerHTML = `<span class="title">Status: </span>
  <span class="value"> ${info.weather().main}</span>`;

  weatherInfo[1].innerHTML = `<span class="title">Wind Speed: </span>
  <span class="value"> ${info.wind().speed} Km/hr</span>`;

  tempInfo[0].innerHTML = `<span class="title">Temp: </span>
  <span class="value"> ${Math.round(info.temp().temp - 273.15)}°C</span>`;

  tempInfo[1].innerHTML = `<span class="title">Max Temp: </span>
  <span class="value"> ${Math.round(info.temp().temp_max - 273.15)}°C</span>`;

  tempInfo[2].innerHTML = `<span class="title">Min Temp: </span>
  <span class="value"> ${Math.round(info.temp().temp_min - 273.15)}°C</span>`;

  tempInfo[3].innerHTML = `<span class="title">Humidity: </span>
  <span class="value"> ${info.temp().humidity}%</span>`;

  tempInfo[4].innerHTML = `<span class="title">Pressure:</span>
  <span class="value"> ${info.temp().pressure} hPa</span>`;

  dateInfo.innerHTML = `${currentDate().today}, 
                        ${date.getDate()} ${currentDate().month}
                        ${date.getFullYear()}`
};

const tempConverter = (temp) => {
  const cels = Math.round(temp - 273.15);
  const faren = Math.round(cels * (9 / 5) + 32);
  return [cels, faren];
}

const currentDate = () => {
    const days = ['Sunday','Monday', 'Tuesday', 'Wednesday',
                  'Thursday', 'Friday', 'Saturday'];
    const today = days[date.getDay()];

    const months = [ 'January', 'February', 'March', 'April', 
                     'May', 'June', 'July', 'August',
                     'September', 'October', 'November', 'December',];
    const month = months[date.getMonth()];
    return { today, month };
}

btn.addEventListener('click', async () => {
  loader.style.display = 'block';
  await getWeatherInfo();
  console.log(dataHub.location().city);
});

btnCelsius.addEventListener('click', () => {
  tempInfo[0].innerHTML = `<span class="title">Temp:</span>
  <span class="value"> ${tempConverter(dataHub.temp().temp)[0]}°C</span>`;

  tempInfo[1].innerHTML = `<span class="title">Max Temp:</span>
  <span class="value"> ${tempConverter(dataHub.temp().temp_max)[0]}°C</span>`;

  tempInfo[2].innerHTML = `<span class="title">Min Temp:</span>
  <span class="value"> ${tempConverter(dataHub.temp().temp_min)[0]}°C</span>`;
});

btnFahren.addEventListener('click', () => {

  tempInfo[0].innerHTML = `<span class="title">Temp:</span>
  <span class="value"> ${tempConverter(dataHub.temp().temp)[1]}°F</span>`;

  tempInfo[1].innerHTML = `<span class="title">Max Temp:</span>
  <span class="value"> ${tempConverter(dataHub.temp().temp_max)[1]}°F</span>`;

  tempInfo[2].innerHTML = `<span class="title">Min Temp:</span>
  <span class="value"> ${tempConverter(dataHub.temp().temp_min)[1]}°F</span>`;
});
