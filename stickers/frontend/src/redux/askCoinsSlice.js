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
            state.msg = null;
            state.comp = data.payload;
        },
        askFrom(state,data){
            state.msg = null;
            state.comp = "ask";
            state.userData = data.payload;
        },
    }
});

export default askCoinsSlice;