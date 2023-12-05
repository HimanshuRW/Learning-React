import { useEffect } from "react";

let a1 = 10;
let a2 = 10;

console.log("in the child a file");

export default function ChildA({propA}){
    a1++;
    useEffect(()=>{
        a2++;
        console.log("in the use Effect of ChildA");

        return ()=>{
            console.log("in the return of useEffect of Child A");
        }
    })
    console.log("in the function child A");

    return (
        <h2>
            {console.log("in the rendering of A")}
            a1: {a1} a2: {a2}  propA : {propA}
        </h2>
    )
}