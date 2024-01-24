import { createSlice } from "@reduxjs/toolkit";

const askCoinsSlice = createSlice({
    name: 'askCoins',
    initialState: {
        msg: null,
        comp : "sent", // sent, ask, search
        userData : null
    },
    reducers: {
        setMsg(state, data) { 
            state.msg = data.payload;
        },
        setComp(state,data){
            state.comp = data.payload;
            state.msg = null;
        },
        askFrom(state,data){
            state.comp = "ask";
            state.userData = data.payload;
        }
    }
});

export default askCoinsSlice;