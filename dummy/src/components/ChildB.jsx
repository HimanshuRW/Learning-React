import { useEffect, useState } from "react";

let b1 = 10;
let b2 = 10;

console.log("in the child b file");

export default function ChildA({propB}){
    b1++;
    const [current_state,set_state]= useState(b2);

    useEffect(()=>{
        console.log("in the use Effect of ChildB");

        return ()=>{
            console.log("in the return of useEffect of Child B");
        }
    })
    console.log("in the function child B");

    function reRender() {
        console.log("in the re-reder of B");
        set_state(before=>before+1);
    }

    return (
        <h2 onClick={reRender} >
            {console.log("in the rendering of B")}
            b1: {b1}  b2: {current_state}     propB : {propB}
        </h2>
    )
}