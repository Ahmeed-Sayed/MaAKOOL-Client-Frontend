import { createSlice } from "@reduxjs/toolkit";

const cartItems = createSlice({
  name: "cartItems",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const { id, quantity = 1 } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        // If the item already exists, update its quantity
        existingItem.quantity += quantity;
      } else {
        // If the item does not exist, add it to the cart
        state.push({
          id: id,
          itemName: action.payload.itemName,
          description: action.payload.description,
          price: action.payload.price,
          quantity: quantity,
        });
      }
    },
    removeItem: (state, action) => {
      const id = action.payload.id;
      const itemIndex = state.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.splice(itemIndex, 1); // Remove the item from the cart
      }
    },
    resetCart: (state) => {
      return [];
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        // Update the item's quantity to the specified value
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity, resetCart } = cartItems.actions;
export default cartItems.reducer;
