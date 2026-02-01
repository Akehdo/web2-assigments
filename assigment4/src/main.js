require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const AuthController = require("./modules/auth/auth.controller");
const UsersController = require("./modules/users/users.controller");
const OrdersController = require("./modules/orders/orders.controller");

async function bootstrap() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Mongo connected");

  const app = express();
  app.use(express.json());

  app.get("/health", (_, res) => res.json({ ok: true }));

  app.use("/api/auth", new AuthController().router);
  app.use("/api/users", new UsersController().router);
  app.use("/api/orders", new OrdersController().router);

  app.listen(process.env.PORT, () =>
    console.log("Server started on", process.env.PORT)
  );
}

bootstrap();
