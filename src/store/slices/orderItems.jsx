// orderChangeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  cartItems: null,
  loading: false,
};

export const orderChange = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCart, setLoading } = orderChange.actions;

export default orderChange.reducer;
