import Visual from './components/Visual.jsx';
import Controls from './components/Controls.jsx';
import Choice from './components/Choice.jsx';
import { useEffect, useReducer } from 'react';
import Animate_Context from './store/Animate_Context.jsx';

import './App.css';
// import {reducerFunc, intial_state} from './store/reducerFunc.js';
import kya from './store/reducerFunc.js';
let {intial_state,reducerFunc}=kya;

let myTimer;
let wait = 0;

function App() {
  const [current_state, callReducer] = useReducer(reducerFunc, intial_state);

  useEffect(() => {
    if (current_state.playing == 'playing') {
      myTimer = setTimeout(() => {
        callReducer("SORT");
      }, wait);
    }

    return () => { clearTimeout(myTimer) }
  });

  function stopSorting() {
    console.log("btn puase daba");
    callReducer("PAUSE");
  }
  function startSorting() {
    console.log("btn play daba");
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
    algo: current_state.algo,
    current : current_state.current,
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