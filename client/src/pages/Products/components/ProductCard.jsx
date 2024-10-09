import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const ProductCard = ({ product, handleAddToCart }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log(product._id, "details");
    navigate(`/productdetails/${product._id}`);
  };
  const formatPrice = (price) => {
    return typeof price === "number" ? `₹${price.toFixed(2)}` : "N/A";
  };
  return (
    <Card onClick={handleClick} key={product._id} className="overflow-hidden flex flex-col h-full ">
      <CardHeader className="p-0">
        <img
         loading="lazy"
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
            handleAddToCart(product);
            toast.info("Item added to cart");
            e.stopPropagation();
          }}
          className="w-full bg-green-500 hover:bg-green-600 text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
