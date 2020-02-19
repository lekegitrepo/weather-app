import './scss/app.scss';

const fetchWeatherApi = (location) => {
  const api = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=3200d53ac65b442eb5f439f5613ee06c`, {mode: 'cors'})
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  })
}

fetchWeatherApi('London');
fetchWeatherApi('Paris');
