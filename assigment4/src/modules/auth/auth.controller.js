const express = require("express");
const AuthService = require("./auth.service");
const UsersService = require("../users/users.service");
const auth = require("../../shared/auth.middleware");

class AuthController {
  constructor() {
    this.router = express.Router();
    this.usersService = new UsersService();
    this.authService = new AuthService(this.usersService);

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.me = this.me.bind(this);

    this.router.post("/register", this.register);
    this.router.post("/login", this.login);
    this.router.get("/me", auth, this.me);
  }

  async register(req, res) {
    const { email, password, role } = req.body;
    const user = await this.authService.register(email, password, role);
    res.status(201).json(user);
  }

  async login(req, res) {
    const { email, password } = req.body;
    const token = await this.authService.login(email, password);
    res.json(token);
  }

  async me(req, res) {
    const user = await this.usersService.findById(req.user.sub);
    res.json(user);
  }
}

module.exports = AuthController;
