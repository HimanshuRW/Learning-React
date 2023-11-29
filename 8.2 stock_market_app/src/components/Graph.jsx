import React from "react";
import MyChart from "./Chart.jsx";
import WorkSpace from "./WorkSpace.jsx";
import { useState, useRef } from "react";

const starting_price = 1;
let start_date = new Date();
let current_price = 1;
const update_time = 1000; // 1 sec

let db = [current_price, current_price + 2, current_price];

let change = {
  up : ()=> current_price++,
  down : ()=> current_price--
}

let keepUp = setInterval(()=>{
  db.push(current_price);
},update_time);

const Graph = () => {
  const [data, setData] = useState(null);
  let timer = useRef();

    timer.current = setTimeout(() => {
      setData(Math.random());
    }, update_time);

    console.log("component loaded");
  return (
    <div id="graph">
      <h1>Chart.js with React</h1>
      <MyChart db={db} start_date={start_date} />
      <WorkSpace update={change} />
    </div>
  );
};

export default Graph;
