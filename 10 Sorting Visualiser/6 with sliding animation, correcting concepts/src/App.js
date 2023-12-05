import Visual from './components/Visual.jsx';
import Controls from './components/Controls.jsx';
import Choice from './components/Choice.jsx';
import { useEffect, useState } from 'react';

import './App.css';

let myTimer;
let wait = 1000;

let no_of_elements = 100;
const max_value = 100;
let intial_array;
function reset_array() {
  const arrayOfElements = Array.from({ length: no_of_elements }, () => Math.floor(Math.random() * max_value));
  intial_array = [...arrayOfElements];
}
reset_array();

let render_controls = false;

let intial_state = { array: intial_array, algo: 'bubble' };
function App() {
  const [current_state, set_state] = useState(intial_state);

  function shift_fun() {
    if(current_state.algo=='bubble') set_state({array:current_state.array, algo:'insertion'});
    if(current_state.algo=='insertion') set_state({array:current_state.array, algo:'selection'});
    if(current_state.algo=='selection') set_state({array:current_state.array, algo:'bubble'});
  }
  function reset_fun() {
    reset_array();
    set_state({ array: [...intial_array], algo: current_state.algo });
  }
  function chnageSize(new_size) {
    no_of_elements= new_size;
    reset_fun();
  }

  useEffect(()=>{
    render_controls = true;
    set_state({...current_state});

    return ()=>{ render_controls=false }
  },[intial_array,current_state.algo]);

  let funs = {
    reset_fun,chnageSize
  }
  return (
      <div id="page">
        <Choice changeAlgo={shift_fun} algo={current_state.algo} />
        <div id="superSet">
          {render_controls && <Controls array={current_state.array} funs={funs} algo={current_state.algo} /> }
          <Visual array={current_state.array} />
        </div>
      </div >
  );
}

export default App;