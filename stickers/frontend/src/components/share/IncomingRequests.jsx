import { useState } from "react";

export default function IncomingReqestConatiner({ myArr, styles }) {
  const [msg, setMsg] = useState(null);
  function setError() {
    setMsg({
      success: true,
      msg: "Server Issues, Please try Later !",
    });
  }
  function del() {
    setMsg(null);
  }
  return (
    <div className={styles.container}>
      <h2>Incoming Stickers Requests</h2>
      {msg !== null ? (
        <p
          className={
            styles.msg + " " + (msg.success ? styles.success : styles.fail)
          }
        >
          {msg.msg}
        </p>
      ) : null}
      <IncomingReqestList
        myArr={myArr}
        setError={setError}
        del={del}
        styles={styles}
      />
    </div>
  );
}

function IncomingReqestList({ myArr, setError, del, styles }) {
  return (
    <div className={styles.requestList}>
      {myArr.map((personObj) => {
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
