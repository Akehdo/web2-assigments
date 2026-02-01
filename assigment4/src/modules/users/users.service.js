const User = require("./user.model");

class UsersService {
  findById(id) {
    return User.findById(id).select("-passwordHash");
  }

  findByEmail(email) {
    return User.findOne({ email });
  }

  create(user) {
    return User.create(user);
  }

  findAll() {
    return User.find().select("-passwordHash");
  }
}

module.exports = UsersService;
