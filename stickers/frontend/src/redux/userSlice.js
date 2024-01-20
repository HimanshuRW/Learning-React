import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        details: null,
        // payload will look like this
        // details : {
        //     name : "Himanshu",
        //     email : "himanshurw@gmail.com",
        //     coins : 2,
        //     avg : 80
        // },
        test : "pass",
        history: null
    },
    reducers: {
        setUserDetails(state, userData) { state.details = userData.payload },
        setHistory(state,historyData) { state.history = historyData.payload }
    }
});

export default userSlice;