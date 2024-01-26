import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
    name: 'history',
    initialState: {
        historyArr : null
    },
    reducers: {
        initalise(state, data) { 
            state.historyArr = data.payload;
        },
    }
});

export default historySlice;