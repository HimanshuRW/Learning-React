import { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Intro from "./Intro.jsx";

export default function LandPage() {
    const [page,setPage]=useState('landing');
    let MyPage = ()=>(<h1>hi</h1>);

    if(page=="landing") { MyPage =()=>( <Intro setPage={setPage} />)}
    else if(page=="login") { MyPage =()=> (<Login setPage={setPage} />)}
    else { MyPage =()=> (<Register setPage={setPage} />)}
    
    return (
        <div id="landingPage-content">
            <MyPage />
        </div>
    )
}