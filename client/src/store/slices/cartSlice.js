import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
  },
  reducers: {
    setCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      state.total += action.payload.price;
    },
    removeItem: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        state.total -= existingItem.price * existingItem.quantity;
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
    },
    clearCart: (state, action) => {
      state.cart = [];
      state.total = 0;
    },
    setEntireCart: (state, action) => {
      state.cart = action.payload.cart || [];
      state.total = action.payload.total || 0;
    },
    updateCartQuantity: (state, action) => {
      const { productId, operation } = action.payload;

      const existingItem = state.cart.find((item) => item._id === productId);
    
      if (existingItem) {
        if (operation === "increase") {
          existingItem.quantity += 1;
          state.total += existingItem.price;
        } else if (operation === "decrease" && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.total -= existingItem.price;
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});
export const {
  setCart,
  clearCart,
  setEntireCart,
  removeItem,
  updateCartQuantity,
} = CartSlice.actions;
export default CartSlice.reducer;
