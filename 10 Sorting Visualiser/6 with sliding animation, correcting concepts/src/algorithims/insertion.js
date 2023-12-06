function clearAll() {
    let barArr = document.getElementsByClassName("bars");
    barArr = Array.from(barArr);
    barArr.forEach((element) => {
        element.style.backgroundColor = "#e27070";
    });
}

export default function insertion(arr,iteration,step,current) {
    clearAll();

    let iteration_wala = document.getElementById("b" + iteration);
    let step_wala = document.getElementById("b" + step);
    let current_wala = document.getElementById("b" + current);

    if (iteration_wala == null)
        console.log("iteration_wala nahi mille in selection sorting");
    else
        iteration_wala.style.backgroundColor = "#74e6f7";
    if (current_wala == null)
        console.log("min_wala nahi mille in selection sorting");
    else
        current_wala.style.backgroundColor = "#74e6f7";
    if (step_wala == null)
        console.log("step_wala nahi mille in selection sorting");
    else
        step_wala.style.backgroundColor = "#faa2f7";

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