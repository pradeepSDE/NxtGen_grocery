const Product = require("../models/products");
const createProduct = async (req, res) => {
  const product = req.body;

  // console.log(req.body)
  // console.log(product)
  try {
    const newProduct = new Product({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
      brand: product.brand,
    });
    const response = await newProduct.save();
    if (!response) {
      res.json({ error: "product creation failed" });
    }
    res.json({ message: "product created successfully" });
  } catch (error) {
    console.log(error);
    res.json("internal server error");
  }
};

const getProducts = async (req, res) => {
  const productId = req.params.productId;
  console.log(productId);
  try {
    const product = await Product.findOne({ _id: productId }).lean();
    if (!product) {
      res.json({ error: "product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

const fetchProducts = async(req,res)=>{
  try {
    const products = await Product.find({});
    if (!products) {
      res.json({ error: "no products found" });
    }
    res.json(products);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {fetchProducts, createProduct, getProducts };
