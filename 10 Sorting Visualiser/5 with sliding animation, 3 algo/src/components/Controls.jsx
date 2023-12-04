import { Fragment, useEffect, useState } from "react";
import My_Btn from "./mini_components/My_Btn.jsx";
import Slider from "./mini_components/Slider.jsx";
import bubble from "../algorithims/bubble.js";

let iteration;
let step;
let current;
let timer;

function setup(myAlgo) {
  if (myAlgo == "bubble") {
    iteration = 0;
    step = 0;
    console.log(iteration,"step : ",step);
  }
}

// let playing = "reset";

export default function Controls({ myarray, funs, algo }) {
  const [current_state, set_state] = useState({
    array: [...myarray],
    playing: "pause",
    speed: 950,
  });

  useEffect(() => {
    console.log("yes");
    setup(algo);
    console.log(myarray);
    set_state({ ...current_state,array: [...myarray], playing: "pause" });
  }, [myarray]);

  useEffect(() => {
    setup(algo);
  }, [algo]);

  useEffect(() => {
    let barArr = document.getElementsByClassName("bars");
    barArr = Array.from(barArr);
    barArr.forEach((element) => {
      element.style.transition = `left ${
        (current_state.speed * 0.66) / 1000
      }s linear`;
    });
  }, [current_state.speed]);

  function pauseSorting() {
    console.log("pause sorting");
    set_state({ ...current_state, playing: "pause" });
  }
  function playSorting() {
    console.log("play sorting");
    set_state({ ...current_state, playing: "playing" });
  }
  function change_speed() {
    let new_speed = document.getElementById("mySpeed").value;
    document.getElementById("speedValue").innerText = new_speed;

    let timer_speed = 1000 - new_speed + 1;
    console.log("spped is chnged");
    set_state({ ...current_state, speed: timer_speed });
  }
  function done() {
    let barArr = document.getElementsByClassName("bars");
    barArr = Array.from(barArr);
    barArr.forEach((element) => {
      element.style.backgroundColor = "#6cf577";
    });
    setup(algo);
    set_state({ ...current_state, playing: "reset" });
  }

  function play_Bubble() {
    let output = bubble(current_state.array, iteration, step);
    if (Array.isArray(output)) {
      if (step < output.length - iteration - 2) {
        step++;
      } else {
        step = 0;
        iteration++;
      }
      set_state({ ...current_state, array: output });
    } else done();
  }
  function play_Insertion() {
    let output = bubble(current_state.array, iteration, step);
    if (Array.isArray(output)) {
      if (step < output.length - iteration - 2) {
        step++;
      } else {
        step = 0;
        iteration++;
      }
      set_state({ ...current_state, array: output });
    } else done();
  }

  useEffect(() => {
    if (current_state.playing == "playing") {
      timer = setTimeout(() => {
        if (algo == "bubble") play_Bubble();
      }, current_state.speed * 1.5);

    }
    console.log("in the use effect");
    return () => clearTimeout(timer);
  });

  function change_size() {
    let new_size = document.getElementById("mySize").value;
    document.getElementById("sizeValue").innerText = new_size;
    let myContainerWidth = new_size * 9;
    let myContainerLeft = (1000 - 10 * new_size) / 3;
    let myContainer = document.getElementById("container");
    myContainer.style.width = `${myContainerWidth}px`;
    myContainer.style.left = `${myContainerLeft}px`;
    funs.chnageSize(new_size);
  }

  let click_handler;
  if (current_state.playing == "playing") {
    click_handler = pauseSorting;
  } else if (current_state.playing == "pause") {
    click_handler = playSorting;
  }
  if (current_state.playing == "reset") {
    click_handler = funs.reset_fun;
  }

  return (
    <div id="contols">
      <Slider change_speed={change_speed} change_size={change_size} />
      <button className="btn" onClick={click_handler}>
        <My_Btn playing={current_state.playing} />
      </button>
    </div>
  );
}
