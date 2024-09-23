import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    brand: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("/product/createproduct", product);
      console.log("Product created:", response.data);
      // Reset form or handle success
      toast.info("product added to db")
      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
        brand: "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error creating product:", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          className="border p-2 mb-4 w-full"
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
          className="border p-2 mb-4 w-full"
        />
      </label>

      <label>
        Price:
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          className="border p-2 mb-4 w-full"
        />
      </label>

      <label>
        Category:
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="border p-2 mb-4 w-full"
        />
      </label>

      <label>
        Stock:
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          required
          className="border p-2 mb-4 w-full"
        />
      </label>

      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          required
          className="border p-2 mb-4 w-full"
        />
      </label>

      <label>
        Brand:
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          required
          className="border p-2 mb-4 w-full"
        />
      </label>

      <button type="submit" className="bg-blue-500 text-white p-2">
        Create Product
      </button>
    </form>
  );
};

export default ProductForm;
