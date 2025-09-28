import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import sevaReducer from "./sevaSlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        sevas: sevaReducer,
        user: userReducer,
    },
});
