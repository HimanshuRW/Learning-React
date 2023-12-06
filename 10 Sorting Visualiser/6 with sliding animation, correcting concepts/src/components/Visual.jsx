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


  return (
    <div id="container">
      {/* {console.log("rendering container wihth arr : ",array)} */}
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
                , left : `${index*9+5}px`
                , backgroundColor : "#e27070"
              }}></div>
            )
        })}
    </div>
  );
}
