const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            // data: Buffer,
            // contentType: String,
        },
        brand: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true
    }
)

const Product = mongoose.model("product", productSchema);
module.exports = Product;