
function fillWeatherData(data) {
  document.querySelector("#weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  document.querySelector("#current-temp").alt = `${data.weather[0].description}`
  document.querySelector("#current-temp").textContent = `${data.main.temp}&deg;F`
  document.querySelector("#desc").textContent = `${data.weather[0].description}`;
  document.querySelector("#town-name").innerHTML = data.name;
}
