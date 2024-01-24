// import styles from "./AskUser.codule.css";
import styles from "./ShareUser.module.css";
import getUsers from "../../apis/getUsers.js";
import { useCallback, useState } from "react";
import { useRef } from "react";
import debounce from "../../helpers/debounce.js";
import { useDispatch, useSelector } from "react-redux";
import { askCoinsActions } from "../../redux/store.js";

// what i wana do is as u empty the input
// the await wala thing later get complete and show thw error
// so that can be done by managing a state
// like state will be updated at every key stroke
// and like if state is empty string ... we will simple not show anything even if await is over
// may be/... may be.. u need take complete control over inot and onKeydown event and preventing default behaviour

export default function SearchUser() {
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.askCoins.msg);
  console.log("msg : ", msg);
  const [myUsers, setMyUsers] = useState([]);
  const myInput = useRef();

  function setMsg(data) {
    dispatch(askCoinsActions.setMsg(data));
  }

  function askFrom(details){
    if(details.coins!==undefined)
      dispatch(askCoinsActions.askFrom(details));
  }

  async function update_myUsers() {
    let keyword = myInput.current.value;
    if (keyword.length > 0) {
      let response = await getUsers(keyword);
      console.log("response : ", response);
      if (response.success) {
        if (msg !== null) setMsg(null);
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
          if(msg!==null) setMsg(null);
          setMyUsers([]);
        }
      }
    } else {
      console.log("yesssssss -1 ");
      console.log("yes 1 msg : ", msg);
      if (msg !== null) setMsg(null);
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
