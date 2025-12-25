const express = require("express");
const weatherService = require("../services/weather.service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    const result = await weatherService.getWeatherByCity(city);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
