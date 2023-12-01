import { createContext } from "react";

const Animate_Context = createContext({
    array : [],
    playing : '',
    pauseSorting : ()=>{},
    playSorting : ()=>{},
    resetSorting : ()=>{},
});

export default Animate_Context;