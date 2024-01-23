import {redirect } from 'react-router-dom';

async function authCheck() {
    console.log("in the auth Check");
    const authToken = localStorage.getItem('authToken');
    document.cookie = "authToken="+authToken;
    if (authToken == null) return redirect("/landing");

    // send req and get user details too and return the user
    return null;
};

export default authCheck;