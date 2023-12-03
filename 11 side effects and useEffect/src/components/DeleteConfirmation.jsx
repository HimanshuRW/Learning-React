import { useEffect, useState } from "react";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [remaining_time, set_remaining_time] = useState(TIMER);

  useEffect(()=>{
    let intervalTimer = setInterval(()=>{
      console.log("setting the remaining time");
      set_remaining_time(oldTime=> oldTime-10);
    },10);
    return()=>{clearInterval(intervalTimer)}
  },[]);

  console.log("in the delete confirmatin component");
  useEffect(()=>{
    let myTimer = setTimeout(onCancel,TIMER);
    console.log("timer sett");
    return()=>{
      console.log("timer cleared");
      clearTimeout(myTimer);
    }
  },[]);
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={remaining_time} max={TIMER} />
    </div>
  );
}
