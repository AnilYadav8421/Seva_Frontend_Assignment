import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: { name: "Anil Yadav", email: "anilyadav@gmail.com" },
    orders: ["Order-XXXXX5", "Order-XXXXX6", "Order-XXXXX7"],
    isLoggedIn: true,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.orders = [];
            state.isLoggedIn = false;
        },
        login: (state, action) => {
            state.user = action.payload.user;
            state.orders = action.payload.orders;
            state.isLoggedIn = true;
        },
    },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;
