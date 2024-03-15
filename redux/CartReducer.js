import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { payload } = action;
      const itemPresent = state.cart.find((item) => item.id === payload.id);
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { payload } = action;
      const removeFilter = state.cart.filter((item) => item.id !== payload.id);
      state.cart = removeFilter;
    },
    incrementQuantity: (state, action) => {
      const { payload } = action;
      const itemPresent = state.cart.find((item) => {
        item.id === payload.id;
      });
      itemPresent.quantity++;
    },

    decrementQuantity: (state, action) => {
      const { payload } = action;
      const itemPresent = state.cart.find((item) => {
        item.id === payload.id;
      });
      if (itemPresent.quantity == 1) {
        itemPresent.quantity = 0;
        const removeItem = state.cart.filter((item) => item.id !== payload.id);
        state.cart = removeItem;
      } else {
        itemPresent.quantity--;
      }
    },
    CleanCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  CleanCart,
} = cartSlice.actions;

export default cartSlice.reducer;
