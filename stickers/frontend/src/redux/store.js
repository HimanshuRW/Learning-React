import userSlice from "./userSlice";
import shareSlice from "./shareSlice";
import askCoinsSlice from './askCoinsSlice';
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer : { 
        user : userSlice.reducer, 
        share : shareSlice.reducer,
        askCoins : askCoinsSlice.reducer
    }
});

export const userActions = userSlice.actions;
export const shareActions = shareSlice.actions;
export const askCoinsActions = askCoinsSlice.actions;
export default store;