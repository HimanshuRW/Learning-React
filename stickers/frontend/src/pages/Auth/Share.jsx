import { Fragment, useState } from "react";
import styles from "./Share.module.css";
import { useSelector } from "react-redux";
import OutGoingRequestContainer from "../../components/OutGoingRequestContainer.jsx";

export default function Share() {
  const sharingDetails = useSelector((state) => state.share);
  console.log("My data in share : ", sharingDetails);
  return (
    <div className={styles.pageWrapper}>
      <IncomingReqestConatiner myArr={sharingDetails.giveTo} />
      <OutGoingRequestContainer myArr={sharingDetails.askedTo} styles={styles} />
    </div>
  );
}

function IncomingReqestList({ myArr, setError, del }) {
  return (
    <div className={styles.requestList}>
      {myArr.map((personObj, index, arr) => {
        console.log(personObj.name);
        return (
          <div className={styles.card}>
            <div className={styles.name}>{personObj.name}</div>
            <div className={styles.request}>
              {console.log("in the request")}
              <button className={styles.give} onClick={del}>
                Give {personObj.coins}{" "}
                <img src="/imgs/ethereumGold.png" alt="" srcset="" />
              </button>
              <button className={styles.reject} onClick={setError}>
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function IncomingReqestConatiner({ myArr }) {
  const [msg, setMsg] = useState(null);
  function setError() {
    setMsg({
      success : true,
      msg : "Server Issues, Please try Later !"
    });
  }
  function del() {
    setMsg(null);
  }
  return (
    <div className={styles.container}>
      <h2>Incoming Stickers Requests</h2>
      {msg!==null ? <p className={styles.msg + " " + (msg.success ? styles.success : styles.fail)}>{msg.msg}</p> : null}
      <IncomingReqestList myArr={myArr} setError={setError} del={del} />
    </div>
  );
}
