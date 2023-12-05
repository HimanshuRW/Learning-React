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
    console.log("in the use effect of visual ,, arrr : ",array);
    for(let i =0; i<array.length;i++){
      let myID = 'b'+i.toString();
      // console.log(myID);
      let myBar = document.getElementById(myID);
      // console.log(myBar);
      myBar.style.left = `${i*9+5}px`;
    }

    return ()=>{
      console.log("return cycle");
      let allBars = document.getElementsByClassName("bars");
      allBars = Array.from(allBars);
      allBars.forEach(myBar => {
        myBar.style.backgroundColor = "#e27070";
      });
    }
  },[array]);
  console.log("in the rendering of visual with arr :",array);


  return (
    <div id="container">
      {console.log("rendering container wihth arr : ",array)}
        {array.map((current_val,index)=>{
          // console.log("currentVal : ",current_val);
          let my_height = get_height(current_val);
          // console.log("height : ",my_height);
            let my_class="bars";
            let my_id = 'b'+index.toString();
            // console.log("id formed : ",my_id);
            return (
                <div id={my_id} key={index} className={my_class} style={{height : `${my_height}px`
                // , width : `${my_width}px`
                // , left : `${20+(index*10)}px`
              }}></div>
            )
        })}
    </div>
  );
}
