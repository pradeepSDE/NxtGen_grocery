// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const UserSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email:{
//         type: String,
//         required: true,
//     },
//     password: String,
//     googleId: String,
// }
// )

// const userModel = mongoose.model('user', UserSchema)
// module.exports = userModel

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,

        trim: true,
      },
      city: {
        type: String,

        trim: true,
      },
      state: {
        type: String,

        trim: true,
      },
      zipCode: {
        type: String,

        trim: true,
      },
    },
    phoneNumber: {
      type: String,

      trim: true,
    },
    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product", // Reference to Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    orders: [
      {
        orderId: {
          type: Schema.Types.ObjectId,
          ref: "Order", // Reference to Order model
          required: true,
        },
        orderDate: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["Pending", "Completed", "Cancelled"],
          default: "Pending",
        },
        totalAmount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);
const User = mongoose.model("user", userSchema);

module.exports = User;
