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
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-lg p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to NxtGen grocery
          </h1>
          <p className="text-xl text-white mb-6">
            Your one-stop shop for fresh groceries
          </p>
          <p className="text-sm text-white mb-4"> A unit of Shree Shyam General Stores</p>
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

      <FeaturedProducts />
    </div>
  );
}
