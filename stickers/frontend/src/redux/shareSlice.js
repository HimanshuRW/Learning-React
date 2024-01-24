import { createSlice } from "@reduxjs/toolkit";

const shareSlice = createSlice({
    name: 'share',
    initialState: {
        giveMsg : null,
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
        asked(state,details){
            let myArr = state.askedTo;
            myArr.unshift(details.payload);
            state.askedTo = myArr;
        },
        cancel(state,to){
            let myArr = state.askedTo;
            myArr = myArr.filter(personObj=>(personObj.id!==to.payload));
            state.askedTo= myArr;
        },
        giveSetMsg(state,msg){
            state.giveMsg = msg.payload;
        },
        decision(state,to){
            let myArr = state.giveTo;
            myArr = myArr.filter(personObj=>(personObj.id!==to.payload));
            state.giveTo= myArr;
        }
    }
});

export default shareSlice;