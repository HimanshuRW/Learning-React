function clearAll() {
  let barArr = document.getElementsByClassName("bars");
  barArr = Array.from(barArr);
  barArr.forEach((element) => {
    element.style.backgroundColor = "#e27070";
  });
}

export default function bubble(arr, j, i) {
  console.log("bubble : ",arr);
  // console.log("bubble j : "+j+" i : "+i);
  
  clearAll();
  let b1 = document.getElementById('b' + i);
  let b2 = document.getElementById('b' + (i + 1));

  if(b1==null || b2== null) return 1;
  
  b1.style.backgroundColor = "#74e6f7";
  b2.style.backgroundColor = "#74e6f7";


  if (arr[i] > arr[i + 1]) {

    // console.log("arr-"+i+" > arr-"+(i+1)+"  thats "+arr[i]+" > "+arr[i+1]);
    let temp = arr[i];
    arr[i] = arr[i + 1];
    arr[i + 1] = temp;


    // console.log("swaped");
    b1.style.left = `${(i + 1) * 9 + 5}px`;
    b2.style.left = `${i * 9 + 5}px`;

    b1.id = 'bb' + (i + 1);
    b2.id = 'b' + i;
    b1.id = 'b' + (i + 1);
  }

  if (j < arr.length - 1) {
    return arr;
  } else {
    return 0;
  }
}