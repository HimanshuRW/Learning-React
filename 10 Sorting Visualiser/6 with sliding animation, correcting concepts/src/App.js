import make_visual from './components/mini_components/make_visual.js';
import Choice from './components/Choice.jsx';
import Btn from './components/Btn.jsx';
import Slider from './components/Slider.jsx';
import { useEffect, useState } from 'react';
import  update_btn_icon from './components/mini_components/update_btn_icon.js';
import bubble from './algorithims/bubble.js';
import green from './components/mini_components/green.js';
import selection from './algorithims/selection.js';
import insertion from './algorithims/insertion.js';

import './App.css';

let no_of_elements = 10;
const max_value = 100;
let intial_array;
function reset_array() {
  const arrayOfElements = Array.from({ length: no_of_elements }, () => Math.floor(Math.random() * max_value));
  intial_array = [...arrayOfElements];
}
reset_array();

let intial_state = { array: intial_array, algo: 'bubble' };
function App() {
  const [current_state, set_state] = useState(intial_state);

  function shift_fun() {
    // better put a condition with playing ... bcz like if bubble sorted half.. then shifting algo is not good...
    // so may be always refresh array when chnages
    reset_array();
    playing="pause";
    clearTimeout(timer);
    if (current_state.algo == 'bubble') set_state({ array: [...intial_array], algo: 'insertion' });
    if (current_state.algo == 'insertion') set_state({ array: [...intial_array], algo: 'selection' });
    if (current_state.algo == 'selection') set_state({ array: [...intial_array], algo: 'bubble' });
  }

  // starters ----------------------------
  let playing = "pause";
  let iteration;
  let step;
  let current;
  let myArr = [...current_state.array];
  let wait = 1000;
  let timer;

  let control_btn = document.getElementById("control_btn");
  if(control_btn!=null) update_btn_icon(playing);

  if(current_state.algo=='bubble'){ iteration=0; step=0; }
  else if(current_state.algo=='selection'){ iteration=0; step=1; current=0; }
  else if(current_state.algo=='insertion'){ iteration=1; step=0; current=1; }
  else console.log("now this is not possible .... current_state.algo : "+current_state.algo);

  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------


  console.log("newly loaded array ",myArr);
  console.log("new iterator : "+iteration,"step : "+step);
  function reload_array() {
    reset_array();
    console.log("sorted array",myArr);
    set_state({ array: [...intial_array], algo: current_state.algo });
  }
  function pauseSorting() {
    playing = "pause";
    update_btn_icon(playing);
    clearTimeout(timer);
    console.log("pause --");
  }
  function playSorting() {
    playing = "playing";
    update_btn_icon(playing);
    gameEngine();
    console.log("playing now --");
  }

  function gameEngine() {
    timer = setTimeout(()=>{
      if(current_state.algo=='bubble') play_Bubble();
      else if(current_state.algo=='selection') play_Selection();
      else if(current_state.algo=='insertion') play_Insertion();
      // ... all algos in else if else blocks

      if(playing=='playing') gameEngine();
    },wait);
  }
  function play_Bubble() {
    let output = bubble(myArr, iteration, step);
    if (Array.isArray(output)) {
      if (step < output.length - iteration - 2) {
        step++;
      } else {
        step = 0;
        iteration++;
      }
      myArr = [...output];
    }else over(output);
  }
  function play_Selection() {
    let output = selection(myArr, iteration, step, current);
    if(typeof(output)=='object'){
      //  { new_arr: arr, iteration, step, min_index }
      myArr = [...output.new_arr];
      iteration = output.iteration;
      step = output.step;
      current = output.min_index;

    }else over(output);
  }
  function play_Insertion() {
    let output = insertion(myArr, iteration, step, current);
    if(typeof(output)=='object'){
      //  { new_arr: arr, iteration, step, min_index }
      myArr = [...output.new_arr];
      iteration = output.iteration;
      step = output.step;
      current = output.current;

    }else over(output);
  }

  function over(what) {
    // what = 0 ..... successfully sorted
    // what == 1 ...... something happend... just rerender it
    if(what==0) green();
    playing="reset";
    update_btn_icon(playing);
    // green();
    console.log("its over");
  }

  function change_speed() {
    let new_speed = document.getElementById("mySpeed").value;
    new_speed = parseInt(new_speed);
    let speedValue = document.getElementById("speedValue");
    speedValue.innerText = new_speed;

    wait = 1001-new_speed;

    let barsArr = document.getElementsByClassName("bars");
    barsArr = Array.from(barsArr);
    barsArr.forEach(bar => {
      bar.style.transition = `left ${(wait * 0.66) / 1000}s ease`;
    });
  }
  function change_size() {
    let new_size = document.getElementById("mySize").value;
    new_size = parseInt(new_size);
    let sizeValue = document.getElementById("sizeValue");
    sizeValue.innerText = new_size;
    no_of_elements = new_size;
    clearTimeout(timer);
    playing="pause";
    reload_array();
  }
  console.log("playing ki value hao : "+playing);

  function click_handler() {
    if(playing=="playing") pauseSorting();
    else if(playing=="pause") playSorting();
    else if(playing=="reset") reload_array();
    else console.log("yeh to possible nahi hai ki value of playing is "+playing);
  }


  useEffect(()=>{
    make_visual(myArr);
    change_speed();
    // change_size();
  })
  useEffect(()=>{
    change_size();
  },[]);

  // console.log(" parent : ", current_state.array);
  return (
    <div id="page">
      <Choice changeAlgo={shift_fun} algo={current_state.algo} />
      <div id="superSet">
      <div id="container"></div>
        <div id="controls">
          <Slider change_speed={change_speed} change_size={change_size} />
          <Btn click_handler={click_handler} />
        </div>
      </div>
    </div >
  );
}

export default App;