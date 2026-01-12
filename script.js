const API_KEY = "d73fa2e0c0dafaf1ffeda5de98bfb33d";

// Get weather by city
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const result = document.getElementById("weatherResult");

  if (!city) {
    result.innerHTML = "<p>❌ Please enter a city name</p>";
    return;
  }

  result.innerHTML = "⏳ Loading...";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      result.innerHTML = "<p>❌ City not found</p>";
      return;
    }

    displayWeather(data);
  } catch {
    result.innerHTML = "<p>⚠️ Error fetching weather</p>";
  }
}

// Auto-detect user location
function getLocation() {
  const result = document.getElementById("weatherResult");

  if (!navigator.geolocation) {
    result.innerHTML = "❌ Geolocation not supported";
    return;
  }

  result.innerHTML = "📍 Detecting location...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      displayWeather(data);
    },
    () => {
      result.innerHTML = "❌ Location access denied";
    }
  );
}

// Display weather data
function displayWeather(data) {
  const result = document.getElementById("weatherResult");

  result.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>🌡️ ${data.main.temp} °C</p>
    <p>☁️ ${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
  `;
}

// Dark mode toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// Press Enter to search
document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});
