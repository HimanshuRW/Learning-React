export default function Controls({changeAlgo,algo}) {
  let name;
  if(algo=='ins') name = "Insertion Sort";
  else if(algo=='bubble') name = "Bubble Sort";
  else name = "Selection Sort";
  return (
    <h1 onClick={changeAlgo} >
      {name}
    </h1>
  );
}
