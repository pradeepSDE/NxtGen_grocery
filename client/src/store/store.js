import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/adminUserSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart : cartReducer,
    users: userReducer
  },
});
export default store;
