import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  CreditCard,
  Trash,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { updateQuantity } from "@/utils/AddToCart";
import { clearCart } from "@/store/slices/cartSlice";
import { setUser } from "@/store/slices/authSlice";

export const Cart = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [address, setAddress] = useState(user?.address || "");
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const cart = useSelector((state) => state.cart);
  const cartProducts = cart.cart;
  console.log(cartProducts);

  const total = useSelector((state) => state.cart.total);
  const navigate = useNavigate();
  const createOrder = () => {
    if (total === 0) {
      toast.warning("Empty Cart");
      return;
    }
    navigate("/placeorder");
  };
  const updateAddress = async () => {
    if (!user?._id) {
      console.error("User ID is undefined or missing");
      return; // Stop if the user ID is missing
    }
    const response = await axios.put(`/api/users/${user?._id}`, {
      address: address, // Wrap the address in an object
    });
    console.log("update address", response.data);
  };
  // console.log("update address", user._id);

  const handleAddressUpdate = () => {
    updateAddress();
    setIsEditingAddress(false);
    dispatch(setUser({ ...user, address: address }));
  };
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem("cart");
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Your Cart
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <Truck className="mr-2" /> Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditingAddress ? (
              <div className="flex items-center">
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-grow mr-2 border-green-300 focus:border-green-500 focus:ring-green-500"
                />
                <Button
                  onClick={() => handleAddressUpdate()}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-green-600">{user?.address}</p>
                <Button
                  onClick={() => setIsEditingAddress(true)}
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-50"
                >
                  Update
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-green-700">
              <div className="flex">
                <ShoppingBag className="mr-2" /> Your Items
              </div>
              <div
                onClick={handleClearCart}
                className="flex cursor-pointer justify-center text-red-400 border-2 border-red-400 rounded-full p-2 items-center text-sm"
              >
                <Trash className="h-4 w-4 text-red-400" /> Clear Cart
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cartProducts?.map((product) => (
              <div
                key={product.id}
                className="flex items-center py-4 border-b border-green-200 last:border-b-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-green-800">
                    {product.name}
                  </h3>
                  <p className="text-green-600">
                    ₹{product?.price?.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    onClick={() =>
                      updateQuantity(dispatch, product, "decrease")
                    }
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full p-0 border-green-500 text-green-500 hover:bg-green-50"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2 font-semibold text-green-800">
                    {product.quantity}
                  </span>
                  <Button
                    onClick={() =>
                      updateQuantity(dispatch, product, "increase")
                    }
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full p-0 border-green-500 text-green-500 hover:bg-green-50"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-lg font-semibold text-green-800">Total:</div>
            <div className="text-2xl font-bold text-green-600">
              ₹{total?.toFixed(2)}
            </div>
          </CardFooter>
        </Card>

        <Button
          onClick={createOrder}
          className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <CreditCard className="mr-2" /> Proceed to Payment
        </Button>
      </div>
    </div>
  );
};
