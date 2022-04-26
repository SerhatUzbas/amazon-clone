import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

import cartSlice from "./cartSlice";
const store = configureStore({
  reducer: { user: userSlice.reducer, cart: cartSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
