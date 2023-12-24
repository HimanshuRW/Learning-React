let array = [5,3,7,6,1,2,4];

function quick(arr) {
    let pivot = arr[arr.lenght-1];
    let i =0;
    let j=0;
    if(arr[i]>pivot){
        while(arr[j]>pivot){
            j++;
        }
        swap(i,j);
    }
} 