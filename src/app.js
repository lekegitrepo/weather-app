import './scss/app.scss';

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
  console.log(jsonData.name);
}

fetchWeatherApi('London');
fetchWeatherApi('Paris');
