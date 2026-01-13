const router = require("express").Router();
const Good = require("./good.model");

router.get("/", async (_, res) => {
  const goods = await Good.find();
  if (!goods.length) {
    return res.json({ message: "there is no goods" });
  }
  res.json(goods);
});

router.post("/", async (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ message: "All fields required" });
  }
  const good = await Good.create({ name, price, category });
  res.status(201).json(good);
});

router.get("/:id", async (req, res) => {
  const good = await Good.findById(req.params.id);
  if (!good) {
    return res.status(404).json({ error: "Good not found" });
  }

  res.json(good);
});

router.put("/:id", async (req, res) => {
  const good = await Good.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!good) {
    return res.status(404).json({ error: "Good not found" });
  }
  res.json(good);
});

router.delete("/:id", async (req, res) => {
  const good = await Good.findByIdAndDelete(req.params.id);
  if (!good) {
    return res.status(404).json({ error: "Good not found" });
  }
  res.json({ success: true });
});

module.exports = router;
