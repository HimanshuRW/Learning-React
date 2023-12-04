const no_of_elements = 90;
const max_value = 100;
let intial_array;
function reset_array() {
  const arrayOfElements = Array.from({ length: no_of_elements }, () => Math.floor(Math.random() * max_value));
  intial_array = [...arrayOfElements];
}
reset_array();

let intial_state = { array: [...intial_array], iteration: 0, step: 0, playing: 'pause', algo: "ins", current: 0 };

function reducerFunc(current_state, action) {

  function update(arr, iteration, step, playing, algo = current_state.algo, current = intial_array[0]) {
    let my_newState = { array: [...arr], iteration, step, playing, algo, current };
    return (my_newState);
  }

  function selection() {

    let iteration = current_state.iteration;
    let step = current_state.step;
    let min_index = current_state.current;
    let arr = current_state.array;

    function swap(first, second) {
      let temp = arr[second];
      arr[second] = arr[first];
      arr[first] = temp;
    }
    function mybreak() {
      iteration++;
      min_index = iteration;
      step = iteration + 1;
    }
    if (iteration < arr.length) {
      // sorting goes on
      if (step < arr.length) {
        if (arr[step] < arr[min_index]){
          min_index = step;
        } 
        step++;
      } else {
        swap(iteration, min_index);
        mybreak();
      }
      return update([...arr], iteration, step, 'playing', 'sel', min_index);
    } else {
      // sorting done
      return update([...arr], iteration, step, 'reset', 'sel', min_index);
    }
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
      return update(arr, iteration, step, 'playing', 'ins', current);
    } else {
      return update([...current_state.array], 0, 0, 'reset', 'ins', current);
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

      let id1 = 'b'+i.toString();
      let id2 = 'b'+((i+1).toString());
      let myBar1 = document.getElementById(id1);
      let myBar2 = document.getElementById(id2);

      myBar1.style.left = `${(i+1)*10}px`;
      myBar2.style.left = `${i*10}px`;

      console.log(myBar1);

    }

    if (j < arr.length - 1) {
      // both loops keep going
      if (i < arr.length - j - 1) {
        // simple i++,, no chnage in j
        i++;
      } else {
        // i set to 0 and j++
        i = 0;
        j++;
      }
      return update(arr, j, i, 'playing', current_state.algo);
    } else {
      return update([...current_state.array], 0, 0, 'reset', current_state.algo);
    }
  }

  if (action == "SORT") {
    if (current_state.algo == 'bubble')
      return buuble_sorting();
    else if (current_state.algo == 'ins') return insertion();
    else return selection();
  }
  if (action == "PLAY") {
    if (current_state.algo == 'bubble')
      return buuble_sorting();
    else if (current_state.algo == 'ins') return insertion();
    else return selection();
  }
  if (action == "PAUSE") {
    return ({ ...current_state, playing: 'pause' });
  }
  if (action == "RESET") {
    reset_array();
    // make case for selection sort
    if(current_state.algo=='sel') return update([...intial_array], 0, 1, 'pause', 'sel', 0);
    return update([...intial_array], 1, 0, 'pause', current_state.algo, intial_array[0]);
  }
  if (action == "SHIFT") {
    if (current_state.algo == 'sel')
      return update([...intial_array], 1, 0, 'pause', 'bubble', intial_array[0]);
    else if (current_state.algo == 'bubble')
      return update([...intial_array], 1, 0, 'pause', 'ins', intial_array[0]);
    else
      return update([...intial_array], 0, 1, 'pause', 'sel', 0);

  }
}

let exporting = {
  reducerFunc : reducerFunc,
  intial_state : intial_state
}
export default exporting;