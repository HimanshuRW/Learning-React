// import styles from "./AskUser.codule.css";
import styles from "./ShareUser.module.css";
import getUsers from "../../apis/getUsers.js";
import { useCallback, useState } from "react";
import { useRef } from "react";
import debounce from "../../helpers/debounce.js";
import { useDispatch, useSelector } from "react-redux";
import { askCoinsActions } from "../../redux/store.js";

export default function SearchUser() {
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.askCoins.msg);
  const askedToArr = useSelector((state) => state.share.askedTo);
  console.log("msg : ", msg);
  const [myUsers, setMyUsers] = useState([]);
  const myInput = useRef();

  function setMsg(data) {
    dispatch(askCoinsActions.setMsg(data));
  }

  function askFrom(details){
    if(details.coins!==undefined){
      let asked = false;
      console.log(details);
      askedToArr.forEach(personObj => {
        if(personObj.id==details.id){
          asked = true;
        }
      });

      if(asked){
        dispatch(askCoinsActions.setMsg({
          success: false, msg:`Already sent request to ${details.name}`
        }));
      }else {
        myInput.current.value="";
        setMyUsers([]);
        dispatch(askCoinsActions.askFrom(details));
      }
    }
  }

  async function update_myUsers() {
    let keyword = myInput.current.value;
    if(msg!==null) setMsg(null);

    if (keyword.length > 0) {
      let response = await getUsers(keyword);
      console.log("response : ", response);
      if (response.success) {
        if (response.usersList.length > 0) setMyUsers(response.usersList);
        else setMyUsers([{ name: "No users found..." }]);
      } else {
        let currentKeyWord = myInput.current.value;
        console.log("currentKeyWord : ",currentKeyWord);
        if (currentKeyWord.length > 0) {
          setMsg({
            success: false,
            msg: response.msg,
          });
          setMyUsers([{ name: "No users found..." }]);
        } else {
          setMyUsers([]);
        }
      }
    } else {
      setMyUsers([]);
    }
    console.log("yessssssssss -0");
  }
  let debounced_setMyUsers = useCallback(debounce(update_myUsers, 400), []);
  return (
    <div id={styles.search_conatiner}>
      <div id={styles.search_input_wrapper}>
        <input
          onChange={debounced_setMyUsers}
          type="text"
          id="userSearch"
          placeholder="Search user..."
          ref={myInput}
        />
      </div>
      <div id={styles.suggestionList}>
        {myUsers.map((details) => {
          return <Suggest details={details} clickHandler={askFrom} />;
        })}
      </div>
    </div>
  );
}

function Suggest({ details,clickHandler }) {
  return (
    <div className={styles.suggestion} 
      onClick={()=>clickHandler(details)}
    >
      <span>{details.name}</span>
      {details.coins !== undefined ? <span>{details.coins}</span> : null}
    </div>
  );
}