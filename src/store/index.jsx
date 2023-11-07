import { configureStore } from "@reduxjs/toolkit";
import cartItems from "./slices/cartItems";
export default configureStore({
  reducer: {
    cartItems,
  },
});
