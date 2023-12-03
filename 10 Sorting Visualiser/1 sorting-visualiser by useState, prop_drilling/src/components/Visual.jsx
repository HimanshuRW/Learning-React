export default function Visual({ array,checking }) {
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

  return (
    <div id="container">
        {array.map((current_val,index)=>{
            let my_height = get_height(current_val);
            let my_class;
            if(checking==index) {
              my_class="bars now";
              if(are_swaping(index)) my_class += " swaping_pre";
            } else if ((checking+1)==index) {
              my_class="bars next";
              if(are_swaping(index-1)) my_class += " swaping_pro";
            } else my_class="bars normal";
            return (
                <div key={index} className={my_class} style={{height : `${my_height}px`
                // , width : `${my_width}px`
              }}></div>
            )
        })}
    </div>
  );
}
