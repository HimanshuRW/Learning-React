import timePass from '../apis/timePass.js';
import { useQuery } from "@tanstack/react-query";

export default function SmallC(){
    const {data,isPending} = useQuery({
        queryFn : ()=>timePass(10),
        queryKey : ['check']
    });
    console.log("data : ",data);
    console.log("isPending : ",isPending);
    return null
}