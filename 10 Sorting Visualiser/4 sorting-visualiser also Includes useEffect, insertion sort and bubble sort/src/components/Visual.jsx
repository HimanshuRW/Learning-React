import { useContext, useEffect } from "react";
import Animate_Context from "../store/Animate_Context";

export default function Visual() {
  const {array,step,playing,algo,iteration,current} = useContext(Animate_Context);
  // console.log(algo,array);
  let highest = Math.max(...array);
  let lowest = Math.min(...array);

  const height_max = 350;
  const height_min = 40;
  const my_width = ((200)/(array.lenght));

  let oldRange = highest - lowest;
  let height_range = height_max - height_min;

  function get_height(val) {
    let new_val = (((val - lowest) * height_range) / oldRange) + height_min
    return new_val;
  }

  function are_swaping(current_index) {
    if(array[current_index]>array[current_index+1]) return true;
    return false;
  }

  // useEffect(()=>{
  //   array.forEach((val,index) => {
  //     let myBar = document.getElementById(index.toString());
  //     // console.log(myBar);
  //     myBar.style.left = `(${20+(index*10)}px)`;
  //   });
  // })

  return (
    <div id="container">
        {array.map((current_val,index)=>{
            let my_height = get_height(current_val);
            let my_class="bars";


            if(algo=='bubble'){
              if(step==index) {
                my_class+=" now";
                if(are_swaping(index)) my_class += " swaping_pre";
              } else if ((step+1)==index) {
                my_class+=" next";
                if(are_swaping(index-1)) my_class += " swaping_pro";
              } else my_class+=" normal";
            } else if(algo=='ins'){
              if(step==index) my_class+= ' now';
            } else if(algo=='sel'){
              if(step==index) my_class+= ' now';
              else if(iteration==index) my_class+=' next';
              else if(current==index) my_class+=' pink';
            }
            return (
                <div id={index.toString()} key={index} className={my_class} style={{height : `${my_height}px`
                // , width : `${my_width}px`
                // , left : `${20+(index*10)}px`
              }}></div>
            )
        })}
    </div>
  );
}
