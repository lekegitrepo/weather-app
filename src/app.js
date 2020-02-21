import './scss/app.scss';

const input = document.getElementById('location');
const btn = document.getElementById('submit-loc');
const btnCelsius = document.getElementById('celsius');
const btnFahren = document.getElementById('fahrenheit');
const loader = document.getElementById('loader-container');

const weatherIcon = document.getElementById('weather-icon');
const infoContainer = document.getElementById('info-container');

const locationInfo = document.querySelectorAll('.location > p');
const tempInfo = document.querySelectorAll('.temp > div > p');
const weatherInfo = document.querySelectorAll('.weather> div > p');
const windSpeedInfo = document.querySelectorAll('.wind-speed > div > p');

const errorDiv = document.createElement('div');

let dataHub = null;

async function fetchWeatherApi (location) {
  errorDiv.innerHTML = '';
  try{
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=3200d53ac65b442eb5f439f5613ee06c`, {mode: 'cors'});
    const resp = await api.json();
    console.log(resp)
    return resp;
  }catch (err) {
    console.log('error: unable to fetch weather info');
    loader.style.display = 'none';
    errorDiv.innerHTML = `<h2>Unable to find weather info of ${input.value}</h2>`;
    infoContainer.appendChild(errorDiv);
  }
}

async function getWeatherInfo() {
  const info = await fetchWeatherApi(input.value);
  console.log(info);
  try{
    dataHub = getJSON(info);
    displayWeatherInfo(dataHub);
    loader.style.display = 'none';
  }catch (err) {
    loader.style.display = 'none';
    console.log('Unable to find weather info');
    loader.style.display = 'none';
    errorDiv.innerHTML = `<h2>Unable to find weather info of ${input.value}</h2>`;
    infoContainer.appendChild(errorDiv);
  }
  //getJSONOld(info)
}

const getJSON = (jsonData) => {

  if (jsonData.cod == '404') {
    return;
  }

  const location = () => {
    return {city: jsonData.name, country: jsonData.sys.country};
  }

  const temp = () => {
    return {
      mainTemp: jsonData.main.temp,
      humidity: jsonData.main.humidity,
      pressure: jsonData.main.pressure,
      feels_like: jsonData.main.feels_like,
      minTemp: jsonData.main.temp_min,
      maxTemp: jsonData.main.temp_max
    };
  }

  const weather = () => {
    return {
      weather: jsonData.weather[0].main,
      description: jsonData.weather[0].description,
      icon: jsonData.weather[0].icon
    };
  }

  const wind = () => {
    return {speed: jsonData.wind.speed, deg: jsonData.wind.deg};
  }

  const coordinate = () => {
    return {lon: jsonData.coord.lon, lat: jsonData.coord.lat};
  }

  return {
    location,
    temp,
    weather,
    wind,
    coordinate
  }
};

const displayWeatherInfo = (info) => {
  locationInfo[0].textContent = info.location().city;
  locationInfo[1].textContent = info.location().country;

  weatherIcon.src = `http://openweathermap.org/img/wn/${info.weather().icon}@2x.png`;
  weatherInfo[0].textContent = info.weather().weather;

  tempInfo[0].textContent = info.temp().mainTemp;

  windSpeedInfo[0].textContent = info.wind().speed;
}

btn.addEventListener('click', async () => {
  loader.style.display = 'block';
  await getWeatherInfo();
  console.log(dataHub.location().city);
})

btnCelsius.addEventListener('click', () => {
  const cels = Math.round(dataHub.temp().mainTemp - 273.15);
  console.log(dataHub.temp().mainTemp)
  tempInfo[0].textContent = cels + '°C';
  console.log(cels)
})

btnFahren.addEventListener('click', () => {
  const cels = Math.round(dataHub.temp().mainTemp - 273.15);
  const faren = Math.round(cels * (9 / 5) + 32);
  console.log(dataHub.temp().mainTemp)
  tempInfo[0].textContent = faren + '°F';
  console.log(faren)
})
