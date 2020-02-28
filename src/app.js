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

const errorDiv = document.createElement('div');

let dataHub = null;

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

  locationInfo[2].innerHTML = `<div class= "title">Coordinate: </div>
  <div class="value">Longitude: ${info.coordinate().lon}</div>
  <div class="value">Latitude: ${info.coordinate().lat}</div>`;

  weatherIcon.src = `http://openweathermap.org/img/wn/${info.weather().icon}@2x.png`;
  weatherInfo[0].textContent = info.weather().main;

  tempInfo[0].innerHTML = `<span class="title">Temp:</span>
  <span> ${Math.round(info.temp().temp - 273.15)}°C</span>`;

  tempInfo[1].innerHTML = `<span class="title">Max Temp:</span>
  <span class="value"> ${Math.round(info.temp().temp_max - 273.15)}°C</span>`;

  tempInfo[2].innerHTML = `<span class="title">Min Temp:</span>
  <span class="value"> ${Math.round(info.temp().temp_min - 273.15)}°C</span>`;

  windSpeedInfo[0].textContent = info.wind().speed;
};

btn.addEventListener('click', async () => {
  loader.style.display = 'block';
  await getWeatherInfo();
  console.log(dataHub.location().city);
});

btnCelsius.addEventListener('click', () => {
  const cels = Math.round(dataHub.temp().temp - 273.15);
  const celsMax = Math.round(dataHub.temp().temp_max - 273.15);
  const celsMin = Math.round(dataHub.temp().temp_min - 273.15);
  console.log(dataHub.temp().temp);
  // tempInfo[0].textContent = `${cels}°C`;
  tempInfo[0].innerHTML = `<span class="title">Temp:</span>
  <span> ${cels}°C</span>`;

  tempInfo[1].innerHTML = `<span class="title">Max Temp:</span>
  <span class="value"> ${celsMax}°C</span>`;

  tempInfo[2].innerHTML = `<span class="title">Min Temp:</span>
  <span class="value"> ${celsMin}°C</span>`;

  console.log(cels);
});

btnFahren.addEventListener('click', () => {
  const cels = Math.round(dataHub.temp().temp - 273.15);
  const faren = Math.round(cels * (9 / 5) + 32);
  const farenMax = Math.round((dataHub.temp().temp_max) * (9 / 5) + 32);
  const farenMin = Math.round((dataHub.temp().temp_min) * (9 / 5) + 32);
  console.log(dataHub.temp().temp);
  tempInfo[0].textContent = '';

  tempInfo[0].innerHTML = `<span class="title">Temp:</span>
  <span> ${faren}°F</span>`;

  tempInfo[1].innerHTML = `<span class="title">Max Temp:</span>
  <span class="value"> ${farenMax}°F</span>`;

  tempInfo[2].innerHTML = `<span class="title">Min Temp:</span>
  <span class="value"> ${farenMin}°F</span>`;

  console.log(faren);
});
