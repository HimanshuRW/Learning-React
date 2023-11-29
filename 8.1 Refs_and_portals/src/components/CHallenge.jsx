import { useState,useRef } from "react";
import ResultModal from "./Result.jsx";

export default function TimerChallenge({title , targetTime}){
    const [timerExpired,setTimerExpired] = useState(false);
    const [timerSatrted,setTimerStarted] = useState(false);
    const timer = useRef();
    const dialog = useRef();

    function handleStart(){
        timer.current = setTimeout(()=>{

            setTimerExpired(true);
            dialog.current.showModal();

        },targetTime*1000);

        setTimerStarted(true);
    }
    function handleStop() {
        clearTimeout(timer.current);
        setTimerStarted(false);
        // setTimerExpired(false);
    }
    return (
        <>
        {timerExpired && <ResultModal ref={dialog} targetTime={targetTime} result="win" /> }
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime>1?'s':''}
            </p>
            <p>
                <button onClick={timerSatrted ? handleStop : handleStart}>
                    {timerSatrted ? 'End' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerSatrted? 'active' : undefined}>
                {timerSatrted? 'Time is running...':'timer inactive'}
            </p>
        </section>
        </>
    )
}