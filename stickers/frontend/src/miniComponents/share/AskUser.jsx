import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AskUser.module.css"
import {askCoinsActions,shareActions} from "../../redux/store";
import sendCoinRequest from "../../apis/sendCoinRequest";

export default function AskUser(){
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const coinsSpan = useRef();
    const btn = useRef();
    const userData = useSelector(state=>state.askCoins.userData);
    const comp = useSelector(state=>state.askCoins.comp);
    const msg = useSelector(state=>state.askCoins.msg);

    console.log("userData : ",userData);
    
    if(comp=="ask" && userData==null){
        back();
    }

    async function ask(){
        let totalCoinsToAsk = coinsSpan.current.innerText;
        totalCoinsToAsk = parseInt(totalCoinsToAsk);
        if(totalCoinsToAsk==0){
            dispatch(askCoinsActions.setMsg({
                success:false,
                msg : "R U STUPID ?!😑"
            }))
        } else {
            if(msg!==null) dispatch(askCoinsActions.setMsg(null));
            setLoading(true);
            console.log(userData);
            let response = await sendCoinRequest(userData.id,totalCoinsToAsk);
            done(response.success,totalCoinsToAsk,response.msg);
        }
    }

    function done(success,coins,msg){
        setLoading(false);
        if(success){
            dispatch(askCoinsActions.setComp("sent"));
            dispatch(shareActions.asked({...userData,coins}));
            dispatch(askCoinsActions.setMsg({success:true, msg:"Coins Request Sent !!"}))
        } else {
            dispatch(askCoinsActions.setMsg({success:false, msg:msg}))
        }
    }

    function back(){
        dispatch(askCoinsActions.setComp("search"));
    }

    return(
        <div id={styles.askUser_container}>
            <h2>Ask From :</h2>
            {userData==null ? null : <h2>{userData.name}</h2>}
            <Counter coinsSpan={coinsSpan} btnRef={btn} />
            <button className={styles.myBtn + " " + (loading ? styles.loadingBtn : styles.askBtn)} onClick={ask} ref={btn}>{loading?null:"Ask"}</button>
            <p onClick={loading ? null : back}><span>&#8592;</span> Back</p>
        </div>
    )
}

function Counter({coinsSpan}) {
    const [totalCoins,setTotalCoins] = useState(0);
    const dispatch = useDispatch();
    const msg = useSelector(state=>state.askCoins.msg);

    function increase() {
        if(totalCoins < 5) setTotalCoins(oldState=> oldState+1);
        else {
            dispatch(askCoinsActions.setMsg({
                success : false,
                msg : "Can't ask more then 5 coins !"
            }))
        }
    }
    function decrease() {
        if(totalCoins==4){
            if(msg!==null) dispatch(askCoinsActions.setMsg(null));
        }
        if(totalCoins > 0) setTotalCoins(oldState=> oldState-1);
    }

    
    return(
        <div id={styles.counter}>
            <button onClick={decrease}>-</button>
            <span id={styles.totalCoinsToAsk} ref={coinsSpan}>{totalCoins}</span>
            <button onClick={increase}>+</button>
        </div>
    )
}