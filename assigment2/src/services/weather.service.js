const axios = require("axios");

async function getWeatherByCity(city) {
  if (!city) {
    throw new Error("City is required");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather`;
  const response = await axios.get(url, {
    params: {
      q: city,
      units: "metric",
      appid: process.env.OPENWEATHER_API_KEY,
    },
  });

  const data = response.data;

  return {
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    description: data.weather[0].description,
    windSpeed: data.wind.speed,
    country: data.sys.country,
    coordinates: data.coord,
    rainLast3h: data.rain?.["3h"] ?? 0,
  };
}

module.exports = {
  getWeatherByCity,
};
