const express = require("express");
const newsService = require("../services/news.service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { country } = req.query;
    const news = await newsService.getTopHeadlines(country);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
