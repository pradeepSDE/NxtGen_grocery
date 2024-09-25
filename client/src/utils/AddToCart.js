import {
  setCart,
  setEntireCart,
  updateCartQuantity,
} from "@/store/slices/cartSlice";
import { useSelector } from "react-redux";

export const handleAddToCart = (product, dispatch, setCart) => {
  const productWithQuantity = { ...product, quantity: product.quantity || 1 };
  dispatch(setCart(productWithQuantity));
  const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = currentCart.find((item) => item._id === product._id);
  // console.log(exist)
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    currentCart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(currentCart));
};

export const updateQuantity = (dispatch, product, operation) => {
  dispatch(updateCartQuantity({ productId: product.id, operation }));

  const currentCart = JSON.parse(localStorage.getItem("cart"));
  console.log(currentCart);
  const existingItem = currentCart.find((item) => item.id === product.id);
  if (existingItem) {
    if (operation === "increase") {
      existingItem.quantity += 1;
    } else if (operation === "decrease" && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    }
  }
  localStorage.setItem("cart", JSON.stringify(currentCart));
};
