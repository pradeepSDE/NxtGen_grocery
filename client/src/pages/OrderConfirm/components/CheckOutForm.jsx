import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useSelector, useStore } from "react-redux";
import { toast } from "sonner";

const CheckoutForm = ({ cart, setPaymentStatus }) => {
  console.log(cart);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const handleSubmitPayment = async (e) => {
    e.preventDefault();
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

      // Send paymentMethod, cart, and email to the backend
      const response = await axios.post(
        "/payment",
        {
          paymentMethodId: paymentMethod.id,
          cart,
          email: "raj@gmaol.com", // Pass the user's email
        },
        { withCredentials: true }
      );

      if (response.data.status === "succeeded") {
        setPaymentStatus("Paid");
        alert("Payment succeeded!");
        // handleSubmit();
      } else {
        alert("Payment failed!");
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };
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
    <form onSubmit={handleSubmitPayment} className="flex flex-col ">
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <Button
        className="mt-4 w-full  bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        disabled={!stripe || loading}
      >
        Pay now
      </Button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default CheckoutForm;
