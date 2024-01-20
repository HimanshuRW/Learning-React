import { createStore } from 'redux';
import {createSlice,configureStore} from '@reduxjs/toolkit';

let initial_counter_state = { counter: 0 , show : true};

const counterSlice = createSlice({
    name : 'counter',
    initialState : initial_counter_state,
    reducers : {
        increment(state,data){ state.counter++;console.log(data); },
        decrement(state){ state.counter-- },
        increase(state,action){ state.counter = state.counter + action.payload },
        toggler(state){ state.show = !state.show }
    }
});

let inital_auth_state = {loggedIn : false};

const authSlice = createSlice({
    name : 'auth',
    initialState : inital_auth_state,
    reducers : {
        login(state){state.loggedIn = true},
        logout(state){state.loggedIn = false}
    }
});

const store = configureStore({
    reducer : { counter : counterSlice.reducer, auth : authSlice.reducer}
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;