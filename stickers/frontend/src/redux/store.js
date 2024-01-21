import userSlice from "./userSlice";
import shareSlice from "./shareSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer : { user : userSlice.reducer, share : shareSlice.reducer }
});

export const userActions = userSlice.actions;
export const shareActions = shareSlice.actions;
export default store;