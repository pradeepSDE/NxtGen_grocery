const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartItems: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  paymentStatus: {
    type: String,
    default: "pending", // Can be 'completed', 'failed', etc.
    enum: ["pending", "paid", "failed"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  shippingAddress: {
    type: String, // Optional, in case you want to store shipping details here
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
