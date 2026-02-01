const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Order",
  new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    total: Number,
    status: { type: String, default: "NEW" }
  })
);
