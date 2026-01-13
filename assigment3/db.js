const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://root:example@localhost:27017/goodsdb?authSource=admin"
  );
  console.log("MongoDB connected");
};

module.exports = connectDB;
