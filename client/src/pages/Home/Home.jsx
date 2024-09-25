import { useState } from "react";
import { ShoppingCart, ArrowRight, Plus, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { FeaturedProducts } from "./components/FeaturedProducts";

export default function HomePage() {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const navigate = useNavigate();
  // Sample product data
  const allProducts = [
    {
      id: 1,
      name: "Fresh Apples",
      price: 2.99,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      name: "Organic Bananas",
      price: 1.99,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      name: "Whole Grain Bread",
      price: 3.49,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 4,
      name: "Farm Fresh Eggs",
      price: 4.99,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 5,
      name: "Organic Milk",
      price: 3.79,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 6,
      name: "Fresh Spinach",
      price: 2.49,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 7,
      name: "Ripe Tomatoes",
      price: 1.99,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 8,
      name: "Cheddar Cheese",
      price: 5.99,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 9,
      name: "Chicken Breast",
      price: 6.99,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 10,
      name: "Atlantic Salmon",
      price: 9.99,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 11,
      name: "Avocados",
      price: 2.49,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 12,
      name: "Greek Yogurt",
      price: 3.99,
      image: "/placeholder.svg?height=150&width=150",
    },
  ];

  const loadMore = () => {
    setVisibleProducts((prevCount) =>
      Math.min(prevCount + 4, allProducts.length)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-lg p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to FreshMart
          </h1>
          <p className="text-xl text-white mb-6">
            Your one-stop shop for fresh groceries
          </p>
          <Button
            onClick={() => navigate("/orderhistory")}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center"
          >
            View Your Orders
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <section className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Start Shopping Now
        </h2>
        <Link to={"/products"}>
          <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full text-lg">
            Explore Products
          </Button>
        </Link>
      </section>

      <FeaturedProducts
        setVisibleProducts={setVisibleProducts}
        allProducts={allProducts}
        visibleProducts={visibleProducts}
      />
    </div>
  );
}
