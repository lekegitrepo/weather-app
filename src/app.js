import './scss/app.scss';

const input = document.getElementById('location');
const btn = document.getElementById('submit-loc');
const weatherInfo = document.getElementById('weather-info');
const btnCelsius = document.getElementById('celsius');
const btnFahren = document.getElementById('fahrenheit');
const loader = document.getElementById('loader-container');

/*const fetchWeatherApi = (location) => {
  const api = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=3200d53ac65b442eb5f439f5613ee06c`, {mode: 'cors'})
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res);
    getJSON(res);
    loader.style.display = 'none';
    return res;
  }).catch((err) => {
    loader.style.display = 'none';
    console.log(err);
  })
}*/

async function fetchWeatherApi (location) {
  try{
    const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=3200d53ac65b442eb5f439f5613ee06c`, {mode: 'cors'});
    const resp = await api.json();
    console.log(resp)
    return resp;
  }catch (err) {
    console.log('error: unable to fetch weather info');
  }
  //return resp;
}

async function displayWeatherInfo() {
      const info = await fetchWeatherApi(input.value).catch((err) => {console.log(err)});
      console.log(info);
      /*weatherInfo.innerHTML = `<div>Weather Info</div>
        <p>City: ${jsonData.name}</p>
        <p>Country: ${jsonData.sys.country}</p>
        <p>Temperature: ${jsonData.main.temp}</p>
        <p>Weather: ${jsonData.weather[0].main}</p>
        <p></p>`*/
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
          <p>Temperature: <span id="temp">${jsonData.main.temp}</span></p>
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

btn.addEventListener('click', async () => {
  await displayWeatherInfo();
  //fetchWeatherApi(input.value);
  //loader.style.display = 'block';
  //fetchWeatherApi('London');
  //fetchWeatherApi('Paris');
})

btnCelsius.addEventListener('click', () => {
  const temp = document.getElementById('temp');
  const cels = Math.round(parseFloat(temp.innerText,  10) - 273.15);
  console.log(temp.innerText)
  temp.innerHTML = cels + '°C';
  console.log(cels)
})

btnFahren.addEventListener('click', () => {
  const temp = document.getElementById('temp');
  const cels = Math.round(parseFloat(temp.innerText,  10) - 273.15);
  const faren = Math.round(cels * (9 / 5) + 32);
  console.log(temp.innerText)
  temp.innerHTML = faren + '°F';
  console.log(cels)
})
