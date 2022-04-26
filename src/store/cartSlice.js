import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    items: [],
    totalAmount: 0,
    totalPrice: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    uploadCart(state, action) {
      state.cart.items = action.payload.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      state.cart.totalAmount = state.cart.items.reduce((prev, cur) => {
        return prev + cur.data.quantity;
      }, 0);
      state.cart.totalPrice = state.cart.items.reduce((prev, cur) => {
        return prev + cur.data.totalItemPrice;
      }, 0);
    },
  },
});

export const { addToCart, removeFromCart, uploadCart } = cartSlice.actions;
export const cartItems = (state) => state.cart.cart.items;
export const tAmount = (state) => state.cart.cart.totalAmount;
export const tPrice = (state) => state.cart.cart.totalPrice;

export default cartSlice;
