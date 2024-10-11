import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Banknote, ArrowRight, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { clearCart } from "@/store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
export const OrderConfirmation = () => {
  const totalAmount = useSelector((state) => state.cart.total);
  const [loading, setLoading] = useState(false);
  const orderItems = useSelector((state) => state.cart.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const user = auth.user;
  //handling the payment method form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.isAuthenticated) {
      toast.info("Please login to place order", "info");
      return;
    }
    if (paymentMethod === "stripe") {
      await handleSubmitPayment();
    } else if (paymentMethod === "cod") {
      setPaymentStatus("unpaid");
      placeOrder("pending");
    }
  };

  //placing order
  const cart = useSelector((state) => state.cart.cart);
  const placeOrder = async (paymentStatus) => {
    setLoading(true);
    // const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart,"cart");
    const orderData = {
      cart,
      total: totalAmount,
      paymentStatus: paymentStatus,
    };
    try {
      // const token = getCookie("token");
      // console.log(token);
      const response = await axios.post("/api/orders", orderData, {
        withCredentials: true,
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

  //making payment using stripe API
  const handleSubmitPayment = async () => {
    if (!auth.isAuthenticated) {
      toast.error("Please login to place order");
      return;
    }
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create Payment Method using Stripe's API
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "/payment",
        {
          paymentMethodId: paymentMethod.id,
          cart: orderItems,
          email: user?.email, // Pass the user's email
        },
        { withCredentials: true }
      );

      if (response.data.status === "succeeded") {
        setPaymentStatus("paid");
        toast.success("Payment succeeded!");
        console.log("calling place order");
        console.log(paymentStatus);
        placeOrder("paid");
      } else {
        toast.error("Payment failed!");
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };
  // Card Element options
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d", // Base color for card input
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px", // Font size for card input
        "::placeholder": {
          color: "#aab7c4", // Placeholder color
        },
      },
      invalid: {
        color: "#fa755a", // Invalid card color
        iconColor: "#fa755a", // Invalid icon color
      },
      complete: {
        color: "#4caf50", // Color after valid card details are entered
      },
    },
    hidePostalCode: true, // Hides the postal code input field
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
                  <form className="flex flex-col ">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                    <Button
                      onClick={handleSubmitPayment}
                      className="mt-4 w-full  bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                      disabled={!stripe || loading}
                    >
                      {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Pay now
                    </Button>
                    {error && <div>{error}</div>}
                  </form>
                )}
                {paymentMethod === "cod" && (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    pay on delivery
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
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
