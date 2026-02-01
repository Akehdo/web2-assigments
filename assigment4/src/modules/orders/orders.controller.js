const express = require("express");
const OrdersService = require("./orders.service");
const auth = require("../../shared/auth.middleware");
const role = require("../../shared/role.middleware");

class OrdersController {
  constructor() {
    this.router = express.Router();
    this.service = new OrdersService();

    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);

    this.router.get("/", auth, this.list);
    this.router.get("/:id", auth, this.findById);

    this.router.post("/", auth, role("admin"), this.create);
    this.router.put("/:id", auth, role("admin"), this.update);
    this.router.delete("/:id", auth, role("admin"), this.remove);
  }

  async list(req, res, next) {
    try {
      const orders = await this.service.findAll();
      res.json(orders);
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const order = await this.service.findById(req.params.id);
      res.json(order);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const order = await this.service.create(req.user.sub, req.body.total);
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const order = await this.service.update(
        req.params.id,
        req.body
      );
      res.json(order);
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      await this.service.delete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrdersController;
