import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sevas: [],
};

const sevaSlice = createSlice({
    name: "sevas",
    initialState,
    reducers: {
        setSevas: (state, action) => {
            state.sevas = action.payload;
        },
    },
});

export const { setSevas } = sevaSlice.actions;
export default sevaSlice.reducer;
