import update_btn_icon from "./mini_components/update_btn_icon.js";
import Slider from "./mini_components/Slider.jsx";
import bubble from "../algorithims/bubble.js";

let timer;
let speed = 950;

function green() {
  let barArr = document.getElementsByClassName("bars");
  barArr = Array.from(barArr);
  barArr.forEach((element) => {
    element.style.backgroundColor = "#6cf577";
  });
}

export default function Controls({ array, funs, algo }) {
  let iteration;
  let step;

  function setup(myAlgo) {
    if (myAlgo == "bubble") {
      iteration = 0;
      step = 0;
    }
  }
  let playing = "pause";
  setup(algo);

  console.log("controls loaded -> iteration: "+iteration+"  step:"+step);
  console.log("controls loaded -> arr: ",array);

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
    update_btn_icon(playing);
  }

  function play_Bubble() {
    // console.log("bubble called");
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
    // console.log("game engine");
    if (playing == "playing") {
      timer = setTimeout(() => {
        if (algo == "bubble") play_Bubble();
        gameEngine();
      }, speed * 1.5);
    } else {
      console.log("playing false hai : " + playing);
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
    if (playing == "playing") {
      pauseSorting();
      update_btn_icon(playing);
    } else if (playing == "pause") {
      playSorting();
      update_btn_icon(playing);
    } else if (playing == "reset") {
      funs.reset_fun();
    } else {
      console.log("bhai yeh to possible nahi hai ab");
    }
  }

  return (
    <div id="contols">
      <Slider change_speed={change_speed} change_size={change_size} />
      <button className="btn" onClick={click_handler} id="control_btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          id="play"
        >
          <path
            fill="#000"
            d="M7 17.259V6.741a1 1 0 0 1 1.504-.864l9.015 5.26a1 1 0 0 1 0 1.727l-9.015 5.259A1 1 0 0 1 7 17.259Z"
          ></path>
        </svg>
      </button>
    </div>
  );
}
