import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Leaf, Package, DollarSign, IndianRupee } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { handleAddToCart } from "@/utils/AddToCart";
import { setCart } from "@/store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const ProductDetails = () => {
  const productId = useParams();
  console.log(productId.id);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/product/getproduct/${productId.id}`);
      console.log(response);
      setProduct(response.data);
    };
    fetchProduct();
  }, [productId.id]);
  console.log(product);
  const dispatch = useDispatch();
  const addToCart = () => {
    handleAddToCart(product, dispatch, setCart);
    toast.info("Item added to cart")
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 h-[300px] md:h-auto">
              <img
                src={product.image}
                alt={product.name}
                className="w-auto h-auto max-w-full max-h-full object-contain"
              />
            </div>
            <div className="md:w-1/2  p-6 md:p-8">
              <ScrollArea className="h-screen pr-4">
                <CardHeader className="p-0 mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-3xl font-bold text-green-800 mb-2">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-lg text-green-600">
                        {product.category}
                      </CardDescription>
                    </div>
                    {product.isOrganic && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        <Leaf className="w-4 h-4 mr-1" /> Organic
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-green-50 rounded-lg p-4 mb-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-2">
                      Price
                    </h2>
                    <div className="flex items-center text-3xl font-bold text-green-700">
                      <IndianRupee className="w-8 h-8 mr-1" />
                      {product.price ? product.price.toFixed(2) : "0.00"}
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <p className="text-green-800 mb-6">{product.description}</p>
                  <div className="flex items-center text-green-600 mb-6">
                    <Package className="w-5 h-5 mr-2" />
                    <span>Sold and shipped by FreshMart</span>
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Product Details
                  </h3>
                  <ul className="list-disc list-inside text-green-700 mb-6">
                    <li>Freshly harvested from local farms</li>
                    <li>Rich in essential vitamins and minerals</li>
                    <li>Perfect for healthy snacking or cooking</li>
                    <li>Carefully packaged to maintain freshness</li>
                  </ul>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Nutrition Information
                  </h3>
                  <table className="w-full text-green-700 mb-6">
                    <tbody>
                      <tr>
                        <td>Calories:</td>
                        <td>95 per serving</td>
                      </tr>
                      <tr>
                        <td>Total Fat:</td>
                        <td>0.3g</td>
                      </tr>
                      <tr>
                        <td>Carbohydrates:</td>
                        <td>25g</td>
                      </tr>
                      <tr>
                        <td>Protein:</td>
                        <td>0.5g</td>
                      </tr>
                    </tbody>
                  </table>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Storage Instructions
                  </h3>
                  <p className="text-green-700 mb-6">
                    For optimal freshness, store in the refrigerator. Consume
                    within 7-10 days of purchase for best quality.
                  </p>
                </CardContent>
              </ScrollArea>
              <CardFooter onClick={addToCart} className="p-0 mt-4">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Example usage
