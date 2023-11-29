import { useState,useRef } from "react";
export default function Player() {
  const player_input = useRef();
  const player_name = useRef();
  // const [player_name, set_player_name] = useState('entity');

  function handleChnage() {
    player_name.current.innerText = `Welcome ${player_input.current.value}`;
  }

  return (
    <section id="player">
      <h2 ref={player_name}>Welcome {player_name.current}</h2>
      <p>
        <input ref={player_input} type="text" onChange={handleChnage} />
        <button onClick={handleChnage}>Set Name</button>
      </p>
    </section>
  );
}
