import { memo } from "react";
import My_Btn from "./mini_components/My_Btn.jsx";
import Slider from "./mini_components/Slider.jsx";
import bubble from "../algorithims/bubble.js";

let iteration;
let step;
let current;
let timer;
let speed = 950;

function setup(myAlgo) {
  if (myAlgo == "bubble") {
    iteration = 0;
    step = 0;
  }
}

function green() {
  let barArr = document.getElementsByClassName("bars");
  barArr = Array.from(barArr);
  barArr.forEach((element) => {
    element.style.backgroundColor = "#6cf577";
  });
}


export default function Controls({ array, funs, algo }) {
  console.log("contolsssssssssssssssssssssssssss");
  console.log(array);
  console.log("------------");

  // now u need to reload the btn component
  // also in play , pause event

  let playing = "pause";
  setup(algo);

  function pauseSorting() {
    console.log("pause sorting");
    playing = "pause";
  }
  function playSorting() {
    console.log("play sorting");
    playing = "playing";
    gameEngine();
  }
  function change_speed() {
    let new_speed = document.getElementById("mySpeed").value;
    document.getElementById("speedValue").innerText = new_speed;

    speed = 1000 - new_speed + 1;

    let barArr = document.getElementsByClassName("bars");
    barArr = Array.from(barArr);
    barArr.forEach((element) => {
      element.style.transition = `left ${(speed * 0.66) / 1000}s ease`;
    });
    console.log("spped is chnged");
  }
  function done() {
    green();
    setup(algo);
    playing = "reset";
    // now u need to reload the btn component
    // also in play , pause event
  }

  function play_Bubble() {
    console.log("bubble called");
    let output = bubble(array, iteration, step);
    if (Array.isArray(output)) {
      if (step < output.length - iteration - 2) {
        step++;
      } else {
        step = 0;
        iteration++;
      }
      array = [...output];
    } else done();
  }

  function gameEngine() {
    console.log("game engine");
    if (playing == "playing") {
      timer = setTimeout(() => {
        if (algo == "bubble") play_Bubble();
        gameEngine();
      },speed * 1.5);
    } else {
      console.log("playing false hai : "+playing);
    }
  }

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

  function click_handler() {
    if (playing == "playing") { pauseSorting() } 
    else if (playing == "pause") { playSorting() }
    else if (playing == "reset") { funs.reset_fun() }
    else {
      console.log("bhai yeh to possible nahi hai ab");
    }
  }

  return (
    <div id="contols">
      <Slider change_speed={change_speed} change_size={change_size} />
      <button className="btn" onClick={click_handler}>
        <My_Btn_child playing={playing} />
      </button>
    </div>
  );
}

const My_Btn_child = memo(My_Btn);