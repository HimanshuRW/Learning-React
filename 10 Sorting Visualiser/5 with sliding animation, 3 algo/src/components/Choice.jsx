export default function Controls({changeAlgo,algo}) {
  let name;
  if(algo=='insertion') name = "Insertion Sort";
  else if(algo=='bubble') name = "Bubble Sort";
  else name = "Selection Sort";

  name = `< ${name} >`;
  return (
    <h1 onClick={changeAlgo} >
      {name}
    </h1>
  );
}
