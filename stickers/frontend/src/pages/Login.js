import { Fragment } from "react";

export default function Login(){
    function save(){
        localStorage.setItem("authToken","himash");
    }
    return <Fragment>
        <h1>Login Page</h1>
        <button onClick={save}>save</button>
    </Fragment>
}