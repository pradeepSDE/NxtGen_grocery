const Order = require("../models/orders.js");
const createOrder = async (req, res) => {
  const { cart, paymentStatus } = req.body;
  const user = req.user;

  console.log(paymentStatus, "paymentStatus");
  console.log(user, "user", user.id);
  if (!user || !user.id) {
    return res.status(400).json({ error: "User ID is missing" });
  }
  try {
    const newOrder = new Order({
      userId: user.id,
      cartItems: cart,
      date: Date.now(),
      shippingAddress: user.shippingAddress || null,
      total: req.body.total,
      paymentStatus: paymentStatus,
    });
    const response = await newOrder.save();
    console.log(response);
    if (!response) {
      res.json({ error: "order failed" });
    }
    res.json({ message: "order placed successfully" });
  } catch (error) {
    console.log(error);
  }
};

const getOrderHistory = async (req, res) => {
  console.log(req.user);
  const id = req.user.id;
  // console.log(id);
  try {
    const orders = await Order.find({ userId: id })
      .limit(10)
      .sort({ date: -1 });
    if (!orders) {
      res.json({ error: "no orders found" });
    }
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.json({ error: "something went  wrong" });
  }
};
module.exports = { createOrder, getOrderHistory };
