import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1 });
        state.totalQuantity++;
        state.totalAmount += newItem.price;
      } else {
        existingItem.quantity++;
        state.totalAmount += existingItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.totalAmount = parseFloat(state.totalAmount.toFixed(2));
        if (state.items.length === 0) {
          state.totalAmount = 0;
        }
      }
    },
    increaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
        state.totalAmount += existingItem.price;
      }
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          state.totalAmount -= existingItem.price;
        } else {
          state.items = state.items.filter(item => item.id !== id);
          state.totalQuantity--;
          state.totalAmount -= existingItem.price;
        }
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
