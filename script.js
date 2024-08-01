const apiKey = "9673bbdf6e9e596b228eb59cd39008c5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".error");
const weatherContainer = document.querySelector(".weather");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);

        // Update weather information
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Set weather icon
        const weatherCondition = data.weather[0].main.toLowerCase();
        const iconMap = {
            clouds: "images/clouds.png",
            clear: "images/clear.png",
            rain: "images/rain.png",
            drizzle: "images/drizzle.png",
            mist: "images/mist.png"
        };

        weatherIcon.src = iconMap[weatherCondition] || "images/default.png"; // Default icon if condition not matched

        // Show weather container and hide error
        weatherContainer.style.display = "block";
        error.style.display = "none";

    } catch (err) {
        console.error(err);
        // Display error and hide weather container
        error.textContent = "City not found or there was an issue with the request.";
        error.style.display = "block";
        weatherContainer.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        error.textContent = "Please enter a city name.";
        error.style.display = "block";
        weatherContainer.style.display = "none";
    }
});
