import { useEffect } from "react";
export default function Visual({array}) {
  let highest = Math.max(...array);
  let lowest = Math.min(...array);

  const height_max = 350;
  const height_min = 40;

  let oldRange = highest - lowest;
  let height_range = height_max - height_min;

  function get_height(val) {
    let new_val = (((val - lowest) * height_range) / oldRange) + height_min
    return new_val;
  }
  useEffect(()=>{
    console.log("in the last use effect of Visual");
    for(let i =0; i<array.length;i++){
      let myID = 'b'+i.toString();
      let myBar = document.getElementById(myID);
      myBar.style.left = `${i*9+5}px`;
    }
  });
  console.log("in the rendering of visual");


  return (
    <div id="container">
        {array.map((current_val,index)=>{
            let my_height = get_height(current_val);
            let my_class="bars";
            return (
                <div id={'b'+index.toString()} key={index} className={my_class} style={{height : `${my_height}px`
                // , width : `${my_width}px`
                // , left : `${20+(index*10)}px`
              }}></div>
            )
        })}
    </div>
  );
}
