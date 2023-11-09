// orderChangeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  cartItems: [],
  loading: false,
};

export const orderChange = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.cartCount + 1;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { increment, setCart, setLoading } = orderChange.actions;

export default orderChange.reducer;
