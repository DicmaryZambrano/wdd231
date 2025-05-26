const lat = 9.356341;
const lon = -70.437051;
key = "a17be65d03f7c8ed2f5fee0a51f704c0";

const url = `https://api.openweathermap.org/data/2.5/weather?"units=imperial&lat=${lat}&lon=${lon}&appid=${key}`

async function getWeatherData() {
  try {
    // after this line, our function will wait for the `fetch()` call to be settled
    // the `fetch()` call will either return a Response or throw an error
    const response = await fetch(
      url
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    // after this line, our function will wait for the `response.json()` call to be settled
    // the `response.json()` call will either return the parsed JSON object or throw an error
    const data = await response.json();
    console.log(data);
    fillWeatherData(data);
  } catch (error) {
    console.error(`Could not get prophets: ${error}`);
  }
}

getWeatherData();