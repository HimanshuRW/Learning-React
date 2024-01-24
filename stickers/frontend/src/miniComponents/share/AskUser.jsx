import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AskUser.moduel.css";
import {askCoinsActions} from "../../redux/store";

export default function AskUser(){
    const userData = useSelector(state=>state.askCoins.userData);

    return(
        <div id={styles.askUser_container}>
            <h2>Ask From :</h2>
            <h2>{userData.name}</h2>
            
        </div>
    )
}

function Counter() {
    const [totalCoins,setTotalCoins] = useState(0);
    const dispatch = useDispatch();

    function increase() {
        if(state < 5) setTotalCoins(oldState=> oldState+1);
        else {
            dispatch()
        }
    }

    
    return(
        <div id={styles.counter}>
            <button>-</button>
            <span>{totalCoins}</span>
            <button>+</button>
        </div>
    )
}