async function getWeather() {
  const city = document.getElementById("city").value;

  const weatherRes = await fetch(
    `http://localhost:3001/api/weather?city=${city}`
  );
  const weather = await weatherRes.json();

  document.getElementById("weather").innerHTML = `
    <h3>Weather</h3>
    <p>Temperature: ${weather.temperature} °C</p>
    <p>Description: ${weather.description}</p>
    <p>Feels like: ${weather.feels_like}</p>
    <p>Wind speed: ${weather.wind_speed}</p>
    <p>Country: ${weather.country}</p>
  `;

  const newsRes = await fetch(
    `http://localhost:3001/api/news?country=${weather.country}`
  );
  const news = await newsRes.json();

  document.getElementById("news").innerHTML =
    "<h3>News</h3>" + news.map((n) => `<p>${n.title}</p>`).join("");
}
