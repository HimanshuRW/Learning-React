export default function Controls({changeAlgo,algo}) {
  return (
    <h1 onClick={changeAlgo} >
      {algo=='ins' ? "Insertion Sort" : "Bubble Sort"}
    </h1>
  );
}
