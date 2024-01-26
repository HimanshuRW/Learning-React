import { useDispatch,useSelector } from "react-redux";
import { shareActions, askCoinsActions } from "../../redux/store";
import cancelRequest from "../../apis/cancelRequest";
import { useState } from "react";

export default function OutGoingRequestList({ styles }) {
  const myArr = useSelector(state=>state.share.askedTo);
  console.log("OutGoingRequestList myArr : ",myArr);
  return (
    <div className={styles.requestList + " myScroll"}>
      {myArr.map((personObj) => {
        return (
          <div className={styles.card} key={personObj.id}>
            <div className={styles.name}>{personObj.name}</div>
            <div className={styles.request}>
              {/* <button className={styles.give}>Give <span className={styles.coinIcon}></span>{personObj.coins}</button> */}
              <p>
                For {personObj.coins}{" "}
                <img src="/imgs/ethereumGold.png" alt="" srcset="" />{" "}
              </p>
              <CancelBtn id={personObj.id} styles={styles} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CancelBtn({id ,styles}) {
  console.log("cancel btn id : ",id);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function cancel() {
    setLoading(true);
    let response = await cancelRequest(id);
    console.log("response aaa gaya : ",response);
    if (response.success) {
      dispatch(askCoinsActions.setMsg({ success: true, msg: "Canceled Request !" }));
      dispatch(shareActions.cancel(id));
    } else {
      dispatch(askCoinsActions.setMsg(response));
      setLoading(false);
    }
  }
  return (
    <button className={loading ? styles.rejectBtnLoading : styles.reject} onClick={loading ? null : cancel} key={"btn"+id}>
      {loading ? null : "Cancel"}
    </button>
  );
}
