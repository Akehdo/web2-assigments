const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

const readJson = () => {
  return JSON.parse(fs.readFileSync("data.json", "utf-8"));
};

const writeInJson = (data) => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
};

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

app.get("/hello", (req, res) => {
  res.json({
    message: "Hello from server!",
  });
});

app.get("/time", (req, res) => {
  res.json({
    time: new Date(),
  });
});

app.get("/status", (req, res) => {
  res.json({
    status: 200,
    message: "Server is running",
  });
});

app.get("/goods", (req, res) => {
  const data = readJson();

  if (!data.goods || data.goods.length === 0) {
    return res.json({
      message: "there is no goods",
    });
  }

  res.json(data.goods);
});

app.post("/goods", (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.json({
      error: "Validation error",
      message: "All fields must be filled",
    });
  }

  const data = readJson();

  if (!data.goods || data.goods.length === 0) {
    return res.json({
      message: "there is no goods",
    });
  }

  const newGood = {
    id: data.goods.length + 1,
    name,
    price,
    category,
  };

  data.goods.push(newGood);
  writeInJson(data);

  res.json(newGood);
});

app.put("/goods/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, price, category } = req.body;

  const data = readJson();
  if (!data.goods || data.goods.length === 0) {
    return res.json({
      message: "there is no goods",
    });
  }

  const good = data.goods.find((g) => g.id === id);
  if (!good) {
    return res.status(404).json({ error: "Good not found" });
  }

  if (name) good.name = name;
  if (price) good.price = price;
  if (category) good.category = category;

  writeInJson(data);
  res.json(good);
});

app.delete("/goods/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readJson();

  if (!data.goods || data.goods.length === 0) {
    return res.json({
      message: "there is no goods",
    });
  }

  const idx = data.goods.findIndex((g) => g.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Good not found" });
  }

  data.goods.splice(idx, 1);
  writeInJson(data);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`);
});
