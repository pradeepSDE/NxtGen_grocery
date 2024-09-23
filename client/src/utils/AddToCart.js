import { setCart } from "@/store/slices/cartSlice";

export const handleAddToCart = (product, dispatch, setCart) => {
  const productWithQuantity = { ...product, quantity: product.quantity || 1 };
  dispatch(setCart(productWithQuantity));
  const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = currentCart.find((item) => item.id === product.id);
  // console.log(exist)
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    currentCart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(currentCart));
};

export const updateQuantity = (dispatch, product, operation) => {
  let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

  // Find the existing product in the cart

  let item = currentCart.find((item) => item.id === product.id);

  if (item) {
    if (operation === "increase") {
      item = {
        ...item, // Copy existing item properties
        quantity: item.quantity + 1, // Update quantity
      };
      // Increase quantity
      // item.quantity += 1;
    } else if (operation === "decrease" && item.quantity > 1) {
      // Decrease quantity
      item.quantity -= 1;
    } else if (operation === "decrease" && item.quantity === 1) {
      // If quantity is 1 and the user tries to decrease, remove the item from the cart
      // currentCart = currentCart.filter((item) => item.id !== product.id);
    }
  }
  console.log(currentCart);
  dispatch(setCart(currentCart));
  localStorage.setItem("cart", JSON.stringify(currentCart));
};
