// Constants
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

// Function to update weather data and display it
async function updateWeather(city) {
  try {
    const response = await fetch(`/api/weather?city=${city}`);
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
  } catch (error) {
  console.error('Error fetching weather data:', error);
  res.status(500).json({ error: 'Could not fetch weather data' });
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
searchBtn.addEventListener("click", async () => {
  const city = searchBox.value.trim();
  try {
    await updateWeather(city);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});


// Initial weather check (you can change this to your default city)
// updateWeather("New York");
