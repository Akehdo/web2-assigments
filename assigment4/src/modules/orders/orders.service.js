const Order = require("./order.model");
const AppError = require("../../shared/app.error");

class OrdersService {
  async findAll() {
    return Order.find();
  }

  async findById(id) {
    const order = await Order.findById(id);
    if (!order) {
      throw new AppError("Order not found", 404);
    }
    return order;
  }

  async create(userId, total) {
    return Order.create({
      user: userId,
      total,
      status: "NEW"
    });
  }

  async update(id, data) {
    const order = await Order.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    return order;
  }

  async delete(id) {
    const result = await Order.findByIdAndDelete(id);
    if (!result) {
      throw new AppError("Order not found", 404);
    }
  }
}

module.exports = OrdersService;
