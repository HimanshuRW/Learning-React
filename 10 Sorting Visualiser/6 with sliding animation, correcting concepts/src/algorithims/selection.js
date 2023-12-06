function clearAll() {
    let barArr = document.getElementsByClassName("bars");
    barArr = Array.from(barArr);
    barArr.forEach((element) => {
        element.style.backgroundColor = "#e27070";
    });
}

export default function selection(arr, iteration, step, min_index) {

    console.log(iteration, step);
    clearAll();
    let iteration_wala = document.getElementById("b" + iteration);
    let step_wala = document.getElementById("b" + step);
    let min_wala = document.getElementById("b" + min_index);

    if (iteration_wala == null)
        console.log("iteration_wala nahi mille in selection sorting");
    else
        iteration_wala.style.backgroundColor = "#74e6f7";
    if (min_wala == null)
        console.log("min_wala nahi mille in selection sorting");
    else
        min_wala.style.backgroundColor = "#74e6f7";
    if (step_wala == null)
        console.log("step_wala nahi mille in selection sorting");
    else
        step_wala.style.backgroundColor = "#faa2f7";
    // if(iteration_wala == null || min_wala == null || step_wala==null) return 1;



    function swap(first, second) {
        console.log("swap started");
        let temp = arr[second];
        arr[second] = arr[first];
        arr[first] = temp;

        // first is iteration
        // second is min_index

        // let b1 = document.getElementById('b' + first);  // iteration_wala
        // let b2 = document.getElementById('b' + second);   // min_wala

        iteration_wala.style.left = `${second * 9 + 5}px`;
        min_wala.style.left = `${first * 9 + 5}px`;

        iteration_wala.id = 'bb' + min_index;
        min_wala.id = 'b' + iteration;
        iteration_wala.id = 'b' + min_index;

        console.log("swap end");
    }
    function mybreak() {
        iteration++;
        min_index = iteration;
        step = iteration + 1;
        console.log(iteration, step);
    }
    if (iteration < arr.length) {
        // sorting goes on
        if (step < arr.length) {
            if (arr[step] < arr[min_index]) {
                min_index = step;
            }
            step++;
        } else {
            swap(iteration, min_index);
            mybreak();
        }
        // return update([...arr], iteration, step, 'playing', 'sel', min_index);
        return {
            new_arr: arr, iteration, step, min_index
        };
    } else {
        return 0;
    }
}