const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor(usersService) {
    this.usersService = usersService;
  }

  async register(email, password, role) {
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      passwordHash: hash,
      role,
    });
    return { id: user._id, email: user.email, role: user.role };
  }

  async login(email, password) {
    const user = await this.usersService.findByEmail(email);
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error("Invalid credentials");

    return {
      accessToken: jwt.sign(
        { sub: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
      ),
    };
  }
}

module.exports = AuthService;
