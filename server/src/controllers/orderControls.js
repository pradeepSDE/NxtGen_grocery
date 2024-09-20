const Order = require("../models/orders.js");
const createOrder = async (req, res) => {
  const { cart, user } = req.body;
  try {
    const newOrder = new Order({
      userId: user.id,
      cartItems: cart,
      date: Date.now(),
      shippingAddress: user.shippingAddress || null,
      total: req.body.total,
    });
    const response = await newOrder.save();
    if (!response) {
        res.json({error:"order failed"})
    }
    res.json({ message: "order placed successfully" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createOrder };
