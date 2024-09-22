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

export const ProductCard = ({ product, handleAddToCart, formatPrice }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        console.log(product.id, "details")
        navigate(`/productdetails/${product.id}`)
    }
  return (
    <Card onClick={handleClick} key={product.id} className="overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2 text-green-800">
          {product.name}
        </CardTitle>
        <p className="text-sm text-green-600 mb-2">{product.category}</p>
        <p className="text-sm text-green-600 mb-2">{product.brand}</p>
        <p className="text-lg font-bold text-green-700">
          {formatPrice(product.price)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => handleAddToCart(product)}
          className="w-full bg-green-500 hover:bg-green-600 text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
