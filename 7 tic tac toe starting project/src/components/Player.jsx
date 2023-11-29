import { useState } from "react";


export default function Player(props) {
  const [editing, setIsEditing] = useState(false);
  const [initialName, setName] = useState(props.playerName);

  function changeName(e){
    setName(e.target.value);
  }
  function changeEditing(){
    if (editing) setIsEditing(false);
    else setIsEditing(true);
  }

  return(
    <li className={props.isActive?"active":undefined} >
      <span className="player">
        {editing ? <input type="text" value={initialName} onChange={changeName} /> :<span className="player-name">{initialName}</span>}
        <span className="player-symbol">{props.symbol}</span>
      </span>
      <button onClick={changeEditing}>{editing ? "Save" : "Edit"}</button>
    </li>
  );
}
