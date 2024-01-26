import userSlice from "./userSlice";
import shareSlice from "./shareSlice";
import askCoinsSlice from './askCoinsSlice';
import historySlice from './historySlice';
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer : { 
        user : userSlice.reducer, 
        share : shareSlice.reducer,
        askCoins : askCoinsSlice.reducer,
        history : historySlice.reducer
    }
});

export const userActions = userSlice.actions;
export const shareActions = shareSlice.actions;
export const askCoinsActions = askCoinsSlice.actions;
export const historyActions = historySlice.actions;
export default store;