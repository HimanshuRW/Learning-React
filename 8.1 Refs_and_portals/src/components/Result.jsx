import { forwardRef } from "react";
import { createPortal } from "react-dom";

let ResultModal =forwardRef( function ({result,targetTime,forReset},ref){


    return createPortal(
        <dialog ref={ref} className="result-modal" open>
            <h2>You {result}</h2>
            <p>Your target time was <strong>{targetTime} seconds</strong></p>
            <p>You stopped the timer with <strong>X seconds left.</strong></p>
            <form method="dialog" onSubmit={forReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    );
});

export default ResultModal;