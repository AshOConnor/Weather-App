// Constants
const apiKey = "YOUR API KEY HERE";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

// Function to update weather based on user's current location
function updateWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const response = await fetch(
            `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}`
          );
          if (response.status === 404) {
            handleWeatherError();
            return;
          }

          const data = await response.json();

          cityElement.textContent = data.name;
          tempElement.textContent = Math.round(data.main.temp) + "°C";
          humidityElement.textContent = data.main.humidity + "%";
          windElement.textContent = data.wind.speed + " km/h";

          updateWeatherIcon(data.weather[0].main);

          weatherElement.style.display = "block";
          errorElement.style.display = "none";
        } catch (error) {
          handleWeatherError();
        }
      },
      () => {
        // Handle geolocation error
        handleWeatherError();
      }
    );
  } else {
    // Geolocation not supported by the browser
    handleWeatherError();
  }
}

// Function to update weather data and display it
async function updateWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status === 404) {
      handleWeatherError();
      return;
    }

    const data = await response.json();

    cityElement.textContent = data.name;
    tempElement.textContent = Math.round(data.main.temp) + "°C";
    humidityElement.textContent = data.main.humidity + "%";
    windElement.textContent = data.wind.speed + " km/h";

    updateWeatherIcon(data.weather[0].main);

    weatherElement.style.display = "block";
    errorElement.style.display = "none";
  } catch (error) {
    handleWeatherError();
  }
}

// Function to handle weather errors
function handleWeatherError() {
  weatherElement.style.display = "none";
  errorElement.style.display = "block";
}

// Function to update weather icon
function updateWeatherIcon(weatherMain) {
  const weatherIcons = {
    Clouds: "clouds.png",
    Clear: "clear.png",
    Rain: "rain.png",
    Mist: "mist.png",
    Drizzle: "drizzle.png",
  };
  const iconFileName = weatherIcons[weatherMain] || "default.png";
  weatherIcon.src = "img/" + iconFileName;
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  updateWeather(searchBox.value);
});

// Event listener for the Enter key in the input field
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    updateWeather(searchBox.value);
  }
});

// Event listener to update weather based on user's location when the page is loaded
document.addEventListener("DOMContentLoaded", updateWeatherByLocation);

// Initial weather check (optional)
// updateWeather("Melbourne, AU");
