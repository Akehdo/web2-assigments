const express = require("express");
const bingxService = require("../services/bingx.service");

const router = express.Router();

router.get("/referrals", async (req, res) => {
  try {
    const { apiKey, secretKey } = req.headers;
    const result = await bingxService.getDirectReferrals(apiKey, secretKey);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
