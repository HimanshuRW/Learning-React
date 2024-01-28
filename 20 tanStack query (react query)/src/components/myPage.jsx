import { useState } from 'react';
import timePass from '../apis/timePass.js';
import SmallC from './smallComp.jsx';
import { useQuery } from "@tanstack/react-query";

let x = 1;
export default function MyPage(){
    const [show , setShow] = useState(1);
    const {data,isPending,refetch} = useQuery({
        queryFn : ()=>timePass(10),
        queryKey : ['check'],
        enabled: false
    })
    async function sendReq(){
        x++;
        setShow(old=>old+1);
        refetch();
    }
    console.log("data : ",data);
    console.log("isPending : ",isPending);
    return <>
    {show>2 && <SmallC />}
    <button onClick={sendReq}>Send</button>
    </>
}