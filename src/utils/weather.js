// utils/weatherService.js
const API_KEY = "3a135ab8de8aad2dfa47deea1bf53cca";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Fetch today's weather
export async function fetchTodayWeather(city = "Tashkent") {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.json();
}

// Fetch weather forecast
export async function fetchForecast(city = "Tashkent") {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.json();
}

// Fetch historical weather (for simplicity, we'll just use previous days' weather from the forecast API)
export async function fetchHistoricalWeather(city = "Tashkent", timestamp) {
  const response = await fetch(
    `${BASE_URL}/onecall/timemachine?lat=41.2995&lon=69.2401&dt=${timestamp}&appid=${API_KEY}&units=metric`
  );
  return response.json();
}
