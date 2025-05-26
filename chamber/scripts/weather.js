const lat = 9.356341;
const lon = -70.437051;
const key = "a17be65d03f7c8ed2f5fee0a51f704c0";

function formatTime(unix, timezoneOffset) {
    const date = new Date((unix + timezoneOffset) * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getWeekday(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { weekday: 'long' });
}

function getCurrentWeatherCard(data) {
    const div = document.createElement("div");
    div.className = "weather-info section-box";

    const icon = document.createElement("img");
    icon.id = "weather-icon";
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;
    icon.width = 100;
    icon.height = 100;
    icon.loading = "lazy";
    div.appendChild(icon);

    const tempP = document.createElement("p");
    tempP.innerHTML = `<strong>Temperature:</strong> <span>${Math.round(data.main.temp)}°F</span>`;
    div.appendChild(tempP);

    const descP = document.createElement("p");
    descP.innerHTML = `<strong>Description:</strong> <span>${data.weather[0].description}</span>`;
    div.appendChild(descP);

    const highLowP = document.createElement("p");
    highLowP.innerHTML = `<strong>High:</strong> <span>${Math.round(data.main.temp_max)}°F</span> | <strong>Low:</strong> <span>${Math.round(data.main.temp_min)}°F</span>`;
    div.appendChild(highLowP);

    const humidityP = document.createElement("p");
    humidityP.innerHTML = `<strong>Humidity:</strong> <span>${data.main.humidity}%</span>`;
    div.appendChild(humidityP);

    const sunP = document.createElement("p");
    sunP.innerHTML = `<strong>Sunrise:</strong> <span>${formatTime(data.sys.sunrise, data.timezone)}</span> | <strong>Sunset:</strong> <span>${formatTime(data.sys.sunset, data.timezone)}</span>`;
    div.appendChild(sunP);

    return div;
}

async function getCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${key}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch current weather");
        const data = await response.json();

        const section = document.getElementById("current-weather");
        section.appendChild(getCurrentWeatherCard(data));
    } catch (error) {
        console.error(error);
    }
}

function getForecastCard(title, data) {
    const li = document.createElement("li");
    li.className = "forecast-item";

    const h3 = document.createElement("h3");
    h3.textContent = title;
    li.appendChild(h3);

    // Add weather icon image after h3
    const icon = document.createElement("img");
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;
    icon.width = 100;
    icon.height = 100;
    icon.loading = "lazy";
    li.appendChild(icon);

    const tempBold = document.createElement("strong");
    const tempP = document.createElement("p");
    tempBold.textContent = "Temperature: ";
    const tempSpan = document.createElement("span");
    tempSpan.textContent = `${Math.round(data.main.temp)}°F`;
    tempP.appendChild(tempBold);
    tempP.appendChild(tempSpan);
    li.appendChild(tempP);

    const descBold = document.createElement("strong");
    const descP = document.createElement("p");
    descBold.textContent = "Description: ";
    const descSpan = document.createElement("span");
    descSpan.textContent = data.weather[0].description;
    descP.appendChild(descBold);
    descP.appendChild(descSpan);
    li.appendChild(descP);

    return li;
}

async function getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${key}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch forecast");
        const data = await response.json();

        // Group forecasts by day
        const forecastDays = [];
        const forecastData = {};

        data.list.forEach(item => {
            const date = new Date(item.dt_txt);
            const day = date.getDate();
            if (!forecastDays.includes(day) && forecastDays.length < 3) {
                forecastDays.push(day);
                forecastData[day] = item;
            }
        });

        const forecastList = document.querySelector(".forecast");
        forecastList.innerHTML = "";

        forecastDays.forEach((day, idx) => {
            const item = forecastData[day];
            let title;
            if (idx === 0) {
                title = "Today";
            } else {
                title = getWeekday(item.dt_txt);
            }
            const card = getForecastCard(title, item);
            forecastList.appendChild(card);
        });

    } catch (error) {
        console.error(error);
    }
}

getCurrentWeather();
getForecast();