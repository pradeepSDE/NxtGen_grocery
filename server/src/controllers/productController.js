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

const fetchProducts = async (req, res) => {
  // const { page = 1, limit = 10 } = req.params;

  const {
    brands,
    categories,
    limit = 10,
    page = 1,
    minPrice,
    maxPrice,
    searchQuery,
  } = req.query;
  const offset = (page - 1) * limit;
  try {
    const query = {};
    if (brands) {
      query.brand = { $in: brands };
    }
    if (categories) {
      query.category = { $in: categories };
    }
    if (minPrice && maxPrice) {
      query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    }
    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search in 'name'
        { description: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search in 'description'
        { category: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search in 'description'
      ];
    }

    // console.log(query);
    const products = await Product.find(query).skip(offset).limit(limit);
    const total = await Product.countDocuments(query); // Get the total count of products
    res.json({ products, total });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const fetchCategoriesAndBrands = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    const brands = await Product.distinct("brand");

    res.json({ categories, brands });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  fetchProducts,
  createProduct,
  getProducts,
  fetchCategoriesAndBrands,
};
