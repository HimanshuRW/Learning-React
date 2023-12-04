import { Fragment } from "react";

export default function slider({change_speed,change_size}) {
    return(
        <Fragment>
            <div id="slider">
        <h2>
          Size : <span id="sizeValue">50</span>
        </h2>
        <input
          className="range"
          type="range"
          id="mySize"
          name="kya"
          min="10"
          max="100"
          onChange={change_size}
          // onMouseDrag={change_size}
        />
      </div>
      <div id="slider">
        <h2>
          Speed : <span id="speedValue">25</span> 
        </h2>
        <input
          className="range"
          type="range"
          id="mySpeed"
          min="1"
          max="1000"
          onChange={change_speed}
          // onMouseMove={change_speed}
        />
      </div>
        </Fragment>
    )
}