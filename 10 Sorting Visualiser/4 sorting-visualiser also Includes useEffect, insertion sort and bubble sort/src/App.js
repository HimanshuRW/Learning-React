import Visual from './components/Visual.jsx';
import Controls from './components/Controls.jsx';
import Choice from './components/Choice.jsx';
import { useReducer } from 'react';
import Animate_Context from './store/Animate_Context.jsx';

import './App.css';

const no_of_elements = 60;
const max_value = 100;
let intial_array;
function reset_array() {
  const arrayOfElements = Array.from({ length: no_of_elements }, () => Math.floor(Math.random() * max_value));
  intial_array = [...arrayOfElements];
}
reset_array();
let wait = 2;
// let intial_state = { array: [...intial_array], iteration: 0, step: 0, playing: 'pause' };
let intial_state = { array: [...intial_array], iteration: 0, step: 0, playing: 'pause', algo: "ins", current: intial_array[1] };
let myTimer;

function reducerFunc(current_state, action) {

  function update(arr, iteration, step, playing, algo = current_state.algo,current=intial_array[0]) {
    let my_newState = { array: [...arr], iteration, step, playing, algo, current};
    return (my_newState);
  }

  function insertion() {

    let arr = [...current_state.array];
    let iteration = current_state.iteration;
    let step = current_state.step;
    let current = current_state.current;

    function mybreak() {
      iteration++;
      current = arr[iteration];
      step = iteration - 1;
    }

    if (iteration < arr.length) {
      if (step >= 0) {

        if (arr[step] > current) {
          if (step == 0) {
            arr[1] = arr[0];
            arr[step] = current;
            mybreak();
          }
          else {
            arr[step + 1] = arr[step];
            step--;
          }
        } else {
          arr[step + 1] = current;
          mybreak();
        }

      } else mybreak();

      // mySorting(arr);
      return update(arr, iteration, step, 'playing', 'ins',current);
    } else {
      return update([...current_state.array], 0, 0, 'reset', 'ins',current);
    }
  }

  function buuble_sorting() {
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
      return update(arr, j, i, 'playing',current_state.algo);
    } else {
      return update([...current_state.array], 0, 0, 'reset', current_state.algo);
    }
  }

  if (action == "SORT") {
    if (current_state.algo == 'bubble')
      return buuble_sorting();
    else return insertion();
  }
  if (action == "PLAY") {
    if (current_state.algo == 'bubble')
      return buuble_sorting();
    else return insertion();
  }
  if (action == "PAUSE") {
    clearTimeout(myTimer);
    return ({ ...current_state, playing: 'pause' });
  }
  if (action == "RESET") {
    reset_array();
    return update([...intial_array], 1, 0, 'pause', current_state.algo,intial_array[0]);
  }
  if (action == "SHIFT") {
    if(current_state.algo=='ins')
    return update([...intial_array], 1, 0, 'pause', 'bubble',intial_array[0]);
    else return update([...intial_array], 1, 0, 'pause', 'ins',intial_array[0]);
  }
}


function App() {
  const [current_state, callReducer] = useReducer(reducerFunc, intial_state);

  if (current_state.playing == 'playing') {
    myTimer = setTimeout(() => {
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
  function shift_fun() {
    callReducer("SHIFT");
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
        <Choice changeAlgo={shift_fun} algo={current_state.algo} />
        <Visual />
        <Controls />
      </div >
    </Animate_Context.Provider>
  );
}

export default App;