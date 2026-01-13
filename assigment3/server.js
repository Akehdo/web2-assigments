const express = require("express");
const connectDB = require("./db");
const goodsRoutes = require("./goods.routes");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (_, res) => {
  res.json({ message: "Server is running" });
});

app.use("/goods", goodsRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`);
});
