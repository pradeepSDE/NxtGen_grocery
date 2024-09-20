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
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push({...action.payload,  quantity: action.payload.quantity|| 1});
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
    clearCart: (state,action) => {
      state.cart = [];
      state.total = 0;
    },
    setEntireCart: (state, action) => {
      state.cart = action.payload.cart || [];
      state.total = action.payload.total || 0;
    },
  },
});
export const { setCart, clearCart ,setEntireCart, removeItem } = CartSlice.actions;
export default CartSlice.reducer;
