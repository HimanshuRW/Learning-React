import { useState } from "react";
import OutGoingRequestList from "../miniComponents/OutGoingRequestList";
import AskUser from "../miniComponents/AskUser";

export default function OutGoingRequestContainer({ myArr, styles }) {
  const [msg, setMsg] = useState(null);
  const [wrapperState, setWrapperState] = useState("sent");
  function setError() {
    console.log("me is caled dddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    setMsg({success : true, msg : "Kush Raho yaar"});
  }
  function shift() {
    setMsg(null);
    if (wrapperState == "sent") setWrapperState("ask");
    else setWrapperState("sent");
  }
  return (
    <div className={styles.container}>
      {msg!==null ? <p className={styles.msg + " " + (msg.success ? styles.success : styles.fail)}>{msg.msg}</p> : null}
      <p onClick={shift} className={styles.shift}>
        {wrapperState == "sent" ? "« Send a Request" : "Requests Sent ! »"}
      </p>
      <h2 className={styles.slide+' '+(wrapperState=="sent"? styles.show : styles.hide_left)}>Requests Sent !</h2>
      <h2 className={styles.slide+' '+(wrapperState=="ask"? styles.show : styles.hide_right)}>Send a Request...</h2>

      {/* Sent Data  */}
      <div className={styles.containerData + " " + styles.slide + " " + (wrapperState=="sent" ? styles.show : styles.hide_left)}>
        <OutGoingRequestList myArr={myArr} setError={setError} styles={styles} />
      </div>
      {/* Ask Data  */}
      <div className={styles.containerData + " " + styles.slide + " " + (wrapperState=="ask" ? styles.show : styles.hide_right)}>
        <AskUser setMsg={setMsg} displayMsg={msg} />
      </div>

    </div>
  );
}