// import { Home } from "lucide-react"

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SignupPage from "./pages/Signup";
import { SignIn } from "./pages/Signin";
import { Cart } from "./pages/Cart";
import { Products } from "./pages/Products";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetAuthState } from "./store/AuthState";
import { PrivateRoutes, ProtectedRoute } from "./components/protectedRoutes";
import { setCart, setEntireCart } from "./store/slices/cartSlice";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { OrderHistory } from "./pages/OrderHistory";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";
function App() {
  const dispatch = useDispatch(); // Get dispatch from useDispatch
  const initializeCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
      localStorage.setItem("cart", JSON.stringify([])); // Create empty cart
    }
  };
  useEffect(() => {
    initializeCart();
  }, []);
  useEffect(() => {
    GetAuthState(dispatch); // Pass dispatch as an argument to GetAuthState
    const cart = JSON.parse(localStorage.getItem("cart"));
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    dispatch(setEntireCart({ cart: cart, total: total }));
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>

        <Route path="/placeorder" element={<OrderConfirmation />} />              
        <Route path="/products" element={<Products />} />              
          <Route path="/orderhistory" element={<OrderHistory />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
