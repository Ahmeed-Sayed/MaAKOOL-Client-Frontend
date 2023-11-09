import { configureStore } from "@reduxjs/toolkit";
import orderChange from "./slices/orderItems";
export const store = configureStore({
  reducer: {
    order: orderChange,
  },
});
