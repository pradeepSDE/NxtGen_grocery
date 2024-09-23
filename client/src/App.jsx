// import { Home } from "lucide-react"

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home/Home";
import SignupPage from "./pages/Signup";
import ProductForm from "./pages/AddProduct";
import { SignIn } from "./pages/Signin";
import { Cart } from "./pages/Cart";
import { Products } from "./pages/Products/Products";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GetAuthState } from "./store/AuthState";
import { PrivateRoutes, ProtectedRoute } from "./components/protectedRoutes";
import { setCart, setEntireCart } from "./store/slices/cartSlice";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { OrderHistory } from "./pages/orderHistory/OrderHistory";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import Footer from "./components/Footer";
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.baseURL = "https://nxt-gen-grocery.vercel.app/";
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
 const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Navbar setSearchQuery = {setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>

        <Route path="/placeorder" element={<OrderConfirmation />} />
        <Route path="/products" element={<Products searchQuery = {searchQuery} />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
       <Route path="/product/createproduct" element={<ProductForm/>} />
       
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
