// Redux Store Setup
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./userSide/action/cartSlice.js";
import authReducer from "./userSide/action/authSlice.js";
import productReducer from "./userSide/action/productSlice.js";



const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    product: productReducer,  
  },
});

export default store;