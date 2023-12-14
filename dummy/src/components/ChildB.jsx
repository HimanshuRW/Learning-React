import { useEffect, useContext, useState } from "react";
import MyContext from '../store/My_Context.jsx';

let b1 = 10;
let b2 = 10;

console.log("in the child b file");

export default function ChildA({propB}){
    const {current_parent_state,set_parent_state} = useContext(MyContext);
    b2++;

    // useEffect(()=>{
    //     console.log("in the use Effect of ChildB");

    //     return ()=>{
    //         console.log("in the return of useEffect of Child B");
    //     }
    // },[b2]);
    console.log("in the function child B");

    function reRender() {
        console.log("in the re-reder of B");
        set_parent_state(before=>before+1);
    }

    return (
        <h2 onClick={reRender} >
            {console.log("in the rendering of B")}
            b1: {current_parent_state}  b2: {b2}     propB : {propB}
        </h2>
    )
}