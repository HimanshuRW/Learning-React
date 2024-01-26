import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import decisionApi from "../../apis/decision";
import {shareActions} from "../../redux/store";

export default function IncomingReqestConatiner({ styles }) {
  console.log("IncomingReqestConatiner");
  return (
    <div className={styles.container}>
      <h2>Incoming Stickers Requests</h2>
      <Msg styles={styles} />
      <IncomingReqestList styles={styles} />
    </div>
  );
}

function Msg({ styles }) {
  const giveMsg = useSelector((state) => state.share.giveMsg);
  return (
    <Fragment>
      {giveMsg == null ? null : (
        <p
          className={
            styles.msg + " " + (giveMsg.success ? styles.success : styles.fail)
          }
        >
          {giveMsg.msg}
        </p>
      )}
    </Fragment>
  );
}

function IncomingReqestList({ styles }) {
  const myArr = useSelector((state) => state.share.giveTo);
  return (
    <div className={styles.requestList+" myScroll"}>
      {myArr.map((personObj) => {
        return (
          <div className={styles.card} key={"card"+personObj.id}>
            <div className={styles.name}>{personObj.name}</div>
            <div className={styles.request}>
              <Btns styles={styles} name={personObj.name} id={personObj.id} coins={personObj.coins} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Btns({ styles, id, coins,name }) {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(null); // eaither give or reject or null

  async function makeDecision(choice){
    setLoading(choice);
    let response = await decisionApi(choice=="give",id);
    if(response.success){
      let myMsg;
      if(choice=="give") myMsg = `${coins} coins given to ${name}!`;
      else myMsg = `${coins} coins denied to ${name}!`;
      dispatch(shareActions.giveSetMsg({success:true,msg : myMsg}));
      dispatch(shareActions.decision(id));
    } else {
      dispatch(shareActions.giveSetMsg(response));
    }
  }

  return (
    <Fragment>
      {loading=="give" ?
        <button className={styles.giveBtnLoading} key={"give"+id}></button> 
      : 
        <button className={styles.give} onClick={()=>makeDecision("give")} key={"give"+id}>
          Give {coins} <img src="/imgs/ethereumGold.png" alt="" srcset="" />
        </button>
      }
      {loading=="reject" ?
        <button className={styles.rejectBtnLoading} key={"reject"+id}></button> 
      : 
        <button className={styles.reject} onClick={()=>makeDecision("reject")} key={"reject"+id}>
          Reject
        </button>
      }
    </Fragment>
  );
}
