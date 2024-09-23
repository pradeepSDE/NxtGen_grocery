import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Banknote, ArrowRight, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { clearCart, setCart } from "@/store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { getCookie } from "@/utils/getCookie";
export const OrderConfirmation = () => {
  const [loading, setLoading] = useState(false);
  const orderItems = useSelector((state) => state.cart.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!auth.isAuthenticated){
     toast.info("Please login to place order", "info");
     return;
    }
    placeOrder();
  };
  const totalAmount = useSelector((state) => state.cart.total);
  const user = useSelector((state) => state.auth.user);
  const placeOrder = async () => {
    setLoading(true);
    const cart = JSON.parse(localStorage.getItem("cart"));
    const orderData = {
      user,
      cart,
      total: totalAmount,
      paymentStatus: "pending",
    };
    try {
      const token = getCookie("token");
      console.log(token);
      const response = await axios.post("/api/orders", orderData, {
        withCredentials: true,
        // headers: {
        //   authorization: `Bearer ${token}`
        // }
      });
      if (response.data.error) {
        setLoading(false);
        toast.error(response.data.error, "error");
      } else {
        setLoading(false);
        toast.success("Order Placed Successfully", "success");
        localStorage.removeItem("cart");
        dispatch(clearCart());
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went  wrong", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Complete Your Purchase
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Payment Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-700">
                Payment Method
              </CardTitle>
              <CardDescription>
                Choose your preferred payment option
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4 mb-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stripe" id="stripe" />
                    <Label
                      htmlFor="stripe"
                      className="flex items-center cursor-pointer"
                    >
                      <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                      Pay with Card (Stripe)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label
                      htmlFor="cod"
                      className="flex items-center cursor-pointer"
                    >
                      <Banknote className="w-5 h-5 mr-2 text-green-600" />
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "stripe" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry-date">Expiry Date</Label>
                        <Input id="expiry-date" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {paymentMethod === "stripe"
                    ? "Pay Now"
                    : "Place Order (Cash on Delivery)"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                {/* <Button
                  type="submit"
                  className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  {paymentMethod === "stripe"
                    ? "Pay Now"
                    : "Place Order (Cash on Delivery)"}
                </Button> */}
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-700">
                Order Summary
              </CardTitle>
              <CardDescription>
                Review your items before placing the order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {orderItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-green-800">{item.name}</p>
                      <p className="text-sm text-green-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-green-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <p className="text-green-800">Total</p>
                <p className="text-green-800">${total.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
