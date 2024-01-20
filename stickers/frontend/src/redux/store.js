import userSlice from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer : { user : userSlice.reducer }
});

export const userActions = userSlice.actions;
export default store;