import { updateCartQuantity } from "@/store/slices/cartSlice";

export const handleAddToCart = (product, dispatch, setCart) => {
  const productWithQuantity = { ...product, quantity: product.quantity || 1 };
  dispatch(setCart(productWithQuantity));
  const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = currentCart.find((item) => item._id === product._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    currentCart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(currentCart));
};

export const updateQuantity = (dispatch, product, operation) => {
  dispatch(
    updateCartQuantity({ productId: product._id, operation: operation })
  );
};
