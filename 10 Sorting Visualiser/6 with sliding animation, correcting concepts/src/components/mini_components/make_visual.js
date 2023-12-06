export default function make_visual(array) {
  // console.log("in the visuals ... log array");
  let highest = Math.max(...array);
  let lowest = Math.min(...array);

  const height_max = 350;
  const height_min = 40;

  let oldRange = highest - lowest;
  let height_range = height_max - height_min;

  function get_height(val) {
    let new_val = ((val - lowest) * height_range) / oldRange + height_min;
    return new_val;
  }

  console.log("visuals ko milli array : ", array);
  let container = document.getElementById("container");
  if (container != null) {
    container.innerHTML = "";

    array.forEach((current_val, index) => {
      let my_height = get_height(current_val);
      let my_class = "bars";
      let my_id = "b" + index.toString();
      // console.log(my_id);
      let toAdd = `
      <div
            id=${my_id}
            class=${my_class}
            style = "height: ${my_height}px;left: ${index * 9 + 5}px;backgroundColor: '#e27070';"
      ></div>`;
      container.innerHTML+=toAdd;
    });
  }
}
