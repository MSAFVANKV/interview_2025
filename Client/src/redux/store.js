// Redux Store Setup
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./userSide/action/cartSlice.js";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;