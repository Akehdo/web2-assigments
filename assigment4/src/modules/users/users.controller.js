const express = require("express");
const UsersService = require("./users.service");
const auth = require("../../shared/auth.middleware");
const role = require("../../shared/role.middleware");

class UsersController {
  constructor() {
    this.router = express.Router();
    this.service = new UsersService();

    this.me = this.me.bind(this);
    this.list = this.list.bind(this);

    this.router.get("/me", auth, this.me);
    this.router.get("/", auth, role("admin"), this.list);
  }

  async me(req, res) {
    const user = await this.service.findById(req.user.sub);
    res.json(user);
  }

  async list(req, res) {
    const users = await this.service.findAll();
    res.json(users);
  }
}

module.exports = UsersController;
