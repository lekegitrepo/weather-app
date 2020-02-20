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
  console.log(jsonData.name);
  weatherInfo.innerHTML = `<div>Weather Info</div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <p>City: ${jsonData.name}</p>
          <p>Country: ${jsonData.sys.country}</p>
        </div>
        <div class="col-md-3">
          <p>Temperature: ${jsonData.main.temp}</p>
        </div>
        <div class="col-md-3">
          <p>Weather: ${jsonData.weather[0].main}</p>
        </div>
        <div class="col-md-3">
          <p>Wind Speed</p>
          <p>${jsonData.wind.speed}</p>
        </div>
      </div>
    </div>`
}

btn.addEventListener('click', () => {
  fetchWeatherApi(input.value);
  //fetchWeatherApi('London');
  //fetchWeatherApi('Paris');
})
