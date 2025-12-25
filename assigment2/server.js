const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;
    const response = await axios.get(url);
    const data = response.data;

    res.json({
      temperature: data.main.temp,
      description: data.weather[0].description,
      coordinates: data.coord,
      feels_like: data.main.feels_like,
      wind_speed: data.wind.speed,
      country: data.sys.country,
      rain_last_3h: data.rain ? data.rain["3h"] : 0,
    });
  } catch (err) {
    res.status(500).json({ error: "Weather API error" });
  }
});

app.get("/api/news", async (req, res) => {
  try {
    const country = req.query.country;

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWS_API_KEY}`;
    const response = await axios.get(url);

    res.json(response.data.articles.slice(0, 5));
  } catch (err) {
    res.status(500).json({ error: "News API error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
