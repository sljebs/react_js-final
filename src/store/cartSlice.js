import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const toCents = (amount) => Math.round(amount * 100);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem && existingItem.quantity >= 10) {
        return;
      }

      const price = Number(newItem.price);
      state.totalQuantity++;
      state.totalAmount = (toCents(state.totalAmount) + toCents(price)) / 100;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price,
          image: newItem.image,
          quantity: 1,
          totalPrice: price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = (toCents(existingItem.totalPrice) + toCents(price)) / 100;
      }
    },
    increaseQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && item.quantity < 10) {
        item.quantity++;
        item.totalPrice = (toCents(item.totalPrice) + toCents(item.price)) / 100;
        state.totalQuantity++;
        state.totalAmount = (toCents(state.totalAmount) + toCents(item.price)) / 100;
      }
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = (toCents(item.totalPrice) - toCents(item.price)) / 100;
        state.totalQuantity--;
        state.totalAmount = (toCents(state.totalAmount) - toCents(item.price)) / 100;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalAmount = (toCents(state.totalAmount) - toCents(item.totalPrice)) / 100;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;