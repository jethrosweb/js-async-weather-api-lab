const API_KEY = "5d44fd6293b361930c36bc9729a6a2d9"

function handleFormSubmit(event) {
  //handle submit event
  event.preventDefault()
  let city = document.getElementById("city").value.replace(/ /g, "+")
  fetchCurrentWeather(city)
  fetchFiveDayForecast(city)
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  fetch(url)
  .then(response => response.json())
  .then(json => {displayCurrentWeather(json)})
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
  // const header = document.querySelector("h2")
  const temperature = document.getElementById("temp")
  const tempLow = document.getElementById("low")
  const tempHigh = document.getElementById("high")
  const humidity = document.getElementById("humidity")
  const cloudCover = document.getElementById("cloudCover")

  temperature.innerHTML = json.main.temp
  tempLow.innerHTML = json.main.temp_min
  tempHigh.innerHTML = json.main.temp_max
  humidity.innerHTML = json.main.humidity
  cloudCover.innerHTML = json.clouds.all + "%"
}


function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
  fetch(url)
  .then(response => response.json())
  .then(json => displayFiveDayForecast(json))
}


function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
  const aside = document.querySelector("aside")
  json.list.forEach(forecast => {
    let div = document.createElement("div")
    div.innerHTML = `
    <p>${forecast.dt_txt}</p>
    <p>Temperature: ${forecast.main.temp}</p>
    <p>Humidity: ${forecast.main.humidity}</p>`
    aside.appendChild(div)
  })
}

function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
}

document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
  let submit = document.getElementById("cityForm")
  submit.addEventListener("submit", handleFormSubmit)
})
