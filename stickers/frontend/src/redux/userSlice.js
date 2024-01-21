import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        details: null,
        // payload will look like this
        // initialState : {
        //     name : "Himanshu",
        //     email : "himanshurw@gmail.com",
        //     coins : 2,
        //     avg : 80
        // },
    },
    reducers: {
        setUserDetails(state, userData) { state.details = userData.payload },
    }
});

export default userSlice;