import Visual from './components/Visual.jsx';
import Controls from './components/Controls.jsx';
import Choice from './components/Choice.jsx';
import { useState, useRef } from 'react';
import Animate_Context from './store/Animate_Context.jsx';

import './App.css';

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

function App() {
  const [current_state, set_state] = useState(intial_state);
  let myTimer = useRef();

  if (current_state.playing == 'playing') {
    myTimer = setTimeout(sorting, wait);
  }

  function update(arr, iteration, step, playing) {
    set_state({ array: [...arr], iteration, step, playing });
  }

  function startSorting() {
    sorting();
  }

  function stopSorting() {
    clearTimeout(myTimer);
    set_state({ ...current_state, playing: 'pause' });
  }

  // sort and update the array
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
      update(arr, j, i, 'playing');
    }
    else {
      update([...current_state.array], 0, 0, 'reset');
    }
  }

  function reset_fun() {
    console.log("reset clalled");
    reset_array();
    update([...intial_array], 0, 0, 'pause');
  }

  let cart_context_value = {
    array: current_state.array,
    playing: current_state.playing,
    iteration: current_state.iteration,
    step: current_state.step,
    pauseSorting: stopSorting,
    playSorting: startSorting,
    resetSorting: reset_fun,
  }
  console.log("component loaded : " + current_state.playing);
  return (
    <Animate_Context.Provider value={cart_context_value}>
      <div id="page">
        <Choice />
        <Visual />
        <Controls />
      </div >
    </Animate_Context.Provider>
  );
}

export default App;
