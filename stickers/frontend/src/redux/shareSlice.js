import { createSlice } from "@reduxjs/toolkit";

const shareSlice = createSlice({
    name: 'share',
    initialState: {
        giveTo: null,
        askedTo : null,
        loaded : false,  // set to true when loaded daat from backend
        // payload will look like this
        // giveTo : [
        //     { name : "hhhhihhe", coins : 23},
        //     { name : "hhhhihhe", coins : 23},
        // ],
    },
    reducers: {
        intialise(state, serverData) { 
            state.giveTo = serverData.payload.giveTo;
            state.askedTo = serverData.payload.askedTo;
            state.loaded = true;
        },
    }
});

export default shareSlice;