import Visual from './components/Visual.jsx';
import Controls from './components/Controls.jsx';
import Choice from './components/Choice.jsx';
import { useState, useRef } from 'react';
import forge from 'node-forge';

const publicKeyPem = `-----BEGIN PUBLIC KEY-----\nYOUR_PUBLIC_KEY_HERE\n-----END PUBLIC KEY-----`;

const encryptData = (data) => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(data, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
  });
  return forge.util.encode64(encrypted); // Encrypted data in base64
};


import './App.css';

let intial_array = [11, 5, 3, 8, 2, 7, 1, -1, 6, 8, 1, -2];
let wait = 800;

let intial_state = { array: [...intial_array], iteration: 0, step: 0, playing: false };

let myTimer;

function App() {
  const [current_state, set_state] = useState(intial_state);
  let timer = useRef();

  const encryptedData = encryptData('Hello, encrypt this!');
  console.log("encryptedData : ", encryptedData); // Send to the backend

  function bubble() {
    let arr = [...current_state.array];
    for (let j = 0; j < arr.length; j++) {
      // j is iteration
      for (let i = 0; i < arr.length - j - 1; i++) {
        // i is the step
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
        console.log(j, i, arr);
      }
    }
  };
  // bubble();

  if (current_state.playing) {
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
    set_state({ ...current_state, playing: false });
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
      update(arr, j, i, true);
    }
    else {
      update(intial_array, 0, 0, false);
    }
  }
  return (
    <div id="page">
      <Choice />
      <Visual array={current_state.array} checking={current_state.step} />
      <Controls playing={current_state.playing} start={startSorting} stop={stopSorting} />
    </div >
  );
}

export default App;
