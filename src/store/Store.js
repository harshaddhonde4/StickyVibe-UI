import cartReducer from "./Cart-Slice";
import authReducer from "./Auth-Slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
store.subscribe(() => {
  try {
    const cartState = store.getState().cart;
    localStorage.setItem("cart", JSON.stringify(cartState));
  } catch (error) {
    console.error("Failed to save cart state to localStorage:", error);
  }
});
export default store;
