// import styles from "./AskUser.codule.css";
import styles from "./AskUser.module.css";
import getUsers from "../apis/getUsers.js";
import { useCallback, useState } from "react";
import { useRef } from "react";
import debounce from "../helpers/debounce.js";

// outter div is at 100% width with postion relative
export default function AskUser({setMsg,displayMsg}) {
  const [myUsers,setMyUsers] = useState([]);
  const myInput = useRef();
    let myArr= [
        {name : "Himanshu", coins:32}, {name : "meenal", coins : 24}, {name: "rahul", coins : 3},
        {name : "Himanshu", coins:32}, {name : "meenal", coins : 24}, {name: "rahul", coins : 3},
        {name : "Himanshu", coins:32}, {name : "meenal", coins : 24}, {name: "rahul", coins : 3},
        {name : "Himanshu", coins:32}, {name : "meenal", coins : 24}, {name: "rahul", coins : 3},
    ];
    async function update_myUsers(){
      let keyword = myInput.current.value;
      if(keyword.length>0) {
        let response = await getUsers(keyword);
        console.log("response : ",response);
        if(response.success){
          if(displayMsg!==null) setMsg(null);
          if(response.usersList.length>0)
            setMyUsers(response.usersList);
          else setMyUsers([{name : "No users found..."}]);
        }
        else{
          setMsg({
            success:false, msg : response.msg
          });
          setMyUsers([{name : "No users found..."}]);
        }
      } else {
        // debug it ... even when input is clean.. err is still displayed
        if(displayMsg!==null) setMsg(null);
        setMyUsers([]);
      }
    }

    let debounced_setMyUsers = useCallback(debounce(update_myUsers,400),[]);
    
  return (
    <div id={styles.search_conatiner}>
      <div id={styles.search_input_wrapper}>
        <input onChange={debounced_setMyUsers} type="text" id="userSearch" placeholder="Search user..." ref={myInput}/>
      </div>
      <div id={styles.suggestionList}>
        {myUsers.map(details=>{
            return <Suggest details={details} />
        })}
      </div>
    </div>
  );
}

function Suggest({details}){
    return (
        <div className={styles.suggestion}>
            <span>{details.name}</span>
            {details.coins!==undefined? <span>{details.coins}</span> : null}
        </div>
    )
}