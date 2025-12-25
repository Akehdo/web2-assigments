const express = require("express");
const cors = require("cors");

const weatherRoutes = require("./routes/weather.routes");
const newsRoutes = require("./routes/news.routes");
const bingxRoutes = require("./routes/bingx.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/weather", weatherRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/bingx", bingxRoutes);

module.exports = app;
