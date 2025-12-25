const axios = require("axios");

async function getTopHeadlines(country) {
  if (!country) {
    throw new Error("Country is required");
  }

  const response = await axios.get("https://newsapi.org/v2/top-headlines", {
    params: {
      country,
      apiKey: process.env.NEWS_API_KEY,
    },
  });

  return response.data.articles.slice(0, 3).map((article) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    source: article.source.name,
  }));
}

module.exports = {
  getTopHeadlines,
};
