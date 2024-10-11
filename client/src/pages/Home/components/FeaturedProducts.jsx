import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductCard } from "@/pages/Products/components/ProductCard";
import { setCart } from "@/store/slices/cartSlice";
import { handleAddToCart } from "@/utils/AddToCart";
import axios from "axios";
import { Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const FeaturedProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const loadMore = () => {
    setVisibleProducts((prevCount) => Math.min(prevCount + 4, products.length));
  };
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    setLoading(true);
    const response = await axios.get(`/product/fetchProducts`, {
      params: {
        page: 1,
        limit: 10,
        brands: [],
        categories: [],
        minPrice: 100,
        maxPrice: 1000,
        searchQuery: "",
      },
    });
    // const response = await axios.get("/product/fetchProducts");
    setProducts(response.data.products);
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/productdetails/${product._id}`);
  };
  const formatPrice = (price) => {
    return typeof price === "number" ? `₹${price.toFixed(2)}` : "N/A";
  };
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Featured Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <Card
            onClick={handleClick}
            key={product._id}
            className="overflow-hidden flex flex-col h-full "
          >
            <CardHeader className="p-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-auto h-auto max-w-full max-h-full object-contain"
              />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-lg font-semibold mb-2 text-green-800">
                {product.name}
              </CardTitle>
              <p className="text-sm text-green-600 mb-2">{product.category}</p>
              <p className="text-sm text-green-600 mb-2">{product.brand}</p>
              <p className="text-lg font-bold text-green-700">
                {formatPrice(product.price)}
              </p>
            </CardContent>
            <CardFooter className="p-4  mt-auto ">
              <Button
                onClick={(e) => {
                  handleAddToCart(product, dispatch, setCart);
                  toast.info("Item added to cart");
                  e.stopPropagation();
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
    </section>
  );
};
