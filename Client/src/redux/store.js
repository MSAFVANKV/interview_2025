// Redux Store Setup
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./userSide/action/cartSlice.js";
import authtReducer from "./userSide/action/authSlice.js";


const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authtReducer
  },
});

export default store;