import Visual from './components/Visual.jsx';
import Controls from './components/Controls.jsx';
import Choice from './components/Choice.jsx';
import { useReducer } from 'react';
import Animate_Context from './store/Animate_Context.jsx';

import './App.css';
import { upload } from '@testing-library/user-event/dist/upload.js';

const no_of_elements = 14;
const max_value = 100;
let intial_array;
function reset_array() {
  const arrayOfElements = Array.from({ length: no_of_elements }, () => Math.floor(Math.random() * max_value));
  intial_array = [...arrayOfElements];
}
reset_array();
let wait = 800;
let intial_state = { array: [...intial_array], iteration: 0, step: 0, playing: 'pause' };
let myTimer;

function reducerFunc(current_state, action) {

  function update(arr, iteration, step, playing) {
    return ({ array: [...arr], iteration, step, playing });
  }

  function sorting() {
    let arr = [...current_state.array];
    let i = current_state.step;
    let j = current_state.iteration;
    if (arr[i] > arr[i + 1]) {
      let temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
    }

    if (j < arr.length - 1) {
      // both loops keep going
      if (i < arr.length - j - 2) {
        // simple i++,, no chnage in j
        i++;
      } else {
        // i set to 0 and j++
        i = 0;
        j++;
      }
      return update(arr, j, i, 'playing');
    }else {
      return update([...current_state.array], 0, 0, 'reset');
    }
  }

  if (action == "SORT") {
    return sorting();
  }
  if(action == "PLAY"){
    return sorting();
  }
  if(action == "PAUSE"){
      clearTimeout(myTimer);
      return({ ...current_state, playing: 'pause' });
  }
  if(action == "RESET"){
    reset_array();
    return update([...intial_array], 0, 0, 'pause');
  }
}


function App() {
  const [current_state, callReducer] = useReducer(reducerFunc,intial_state);


  if (current_state.playing == 'playing') {
    myTimer = setTimeout(()=>{
      callReducer("SORT");
    }, wait);
  }
  function stopSorting() {
    callReducer("PAUSE");
  }
  function startSorting() {
    callReducer("PLAY");
  }
  function reset_fun() {
    callReducer("RESET");
  }

  let animate_context_value = {
    array: current_state.array,
    playing: current_state.playing,
    iteration: current_state.iteration,
    step: current_state.step,
    pauseSorting: stopSorting,
    playSorting: startSorting,
    resetSorting: reset_fun,
  }

  return (
    <Animate_Context.Provider value={animate_context_value}>
      <div id="page">
        <Choice />
        <Visual />
        <Controls />
      </div >
    </Animate_Context.Provider>
  );
}

export default App;