import './scss/app.scss';

const input = document.getElementById('location');
const btn = document.getElementById('submit-loc');
const weatherInfo = document.getElementById('weather-info');

const fetchWeatherApi = (location) => {
  const api = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=3200d53ac65b442eb5f439f5613ee06c`, {mode: 'cors'})
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res);
    getJSON(res);
    return res;
  }).catch((err) => {
    console.log(err);
  })
}

const getJSON = (jsonData) => {

  const location = () => {
    return {city: jsonData.name, country: jsonData.sys.country};
  }

  const temp = () => {
    return {temp: jsonData.main.temp, humidity: jsonData.main.humidity, pressure: jsonData.main.pressure};
  }

  const weather = () => {
    return {weather: jsonData.weather[0].main, description: jsonData.weather[0].description};
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
}

btn.addEventListener('click', () => {
  fetchWeatherApi(input.value);
  //fetchWeatherApi('London');
  //fetchWeatherApi('Paris');
})
