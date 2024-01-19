import { createSlice } from toolkit;

const userSlice = createSlice({
    name: 'user',
    initialState: {
        // details : null,
        // details : {
        //     name : "Himanshu",
        //     email : "himanshurw@gmail.com",
        //     coins : 2,
        //     avg : 80
        // },
        history : null
    },
    reducers: {
        open(state, actionObject) { ..actionObject.payload.stuff.. }
}
});

export uiActions = uiSlice.actions;
export default uiSlice;