function clearAll() {
    let barArr = document.getElementsByClassName("bars");
    barArr = Array.from(barArr);
    barArr.forEach((element) => {
        element.style.backgroundColor = "#e27070";
    });
}

export default function insertion(arr,iteration,step,current) {
    clearAll();

    console.log(" ");
    console.log("insertion , iter : "+iteration,"step : "+step,"current : "+current);
    console.log(arr);
    let iteration_wala = document.getElementById("b" + iteration);
    let step_wala = document.getElementById("b" + step);
    let current_wala = document.getElementById("b" + current);

    if (iteration_wala == null)
        console.log("iteration_wala nahi mille in selection sorting");
    else
        iteration_wala.style.backgroundColor = "#faa2f7";
    if (current_wala == null)
        console.log("min_wala nahi mille in selection sorting");
    else
        current_wala.style.backgroundColor = "#74e6f7";
    if (step_wala == null)
        console.log("step_wala nahi mille in selection sorting");
    else
        step_wala.style.backgroundColor = "#74e6f7";

    function mybreak() {
        iteration++;
        console.log("breakkk ;");
        current = iteration;
        step = iteration - 1;
    }
    function swap() {
        let temp = arr[step];
        arr[step]= arr[current];
        arr[current]=temp;



        step_wala.style.left = `${current * 9 + 5}px`;
        current_wala.style.left = `${step * 9 + 5}px`;

        current_wala.id = 'bb' + step;
        step_wala.id = 'b' + current;
        current_wala.id = 'b' + step;
    }

    // ------------
    // for(let i=1; i<myArr.length;i++){
    //     console.log("now i : "+i+"  target : "+myArr[i]);
    //     let c = i;
    //     let s = i-1;
    //     while(myArr[s]>myArr[c]){
    //         swap(s,c);
    //         c=s;
    //         s--;
    //         console.log(myArr);
    //     }
    // }
    // // ----

    if (iteration < arr.length) {
        console.log("still sorting ....");
        if (arr[step]>arr[current]) {
            swap(step,current);
            current=step;
            step--;
        } else {
            console.log("step : "+step,"current : "+current);
            console.log("arr-s : "+arr[step]+", arr-c : "+arr[current],"arr-s>arr-c : "+(arr[step]>arr[current]));
            mybreak();
        }

        // mySorting(arr);
        // return update(arr, iteration, step, 'playing', 'ins', current);
        return {
            new_arr: arr,iteration,step,current
        };
    } else {
        return 0;
    }
}