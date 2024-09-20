import { createSlice } from "@reduxjs/toolkit";
import exp from "constants";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setProducts, setLoading, setError } = ProductSlice.actions;
export default ProductSlice.reducer;
