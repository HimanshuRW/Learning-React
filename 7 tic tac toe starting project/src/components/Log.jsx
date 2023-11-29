export default function Log({log_arr}) {
  return (
    <ol id="log">
      {log_arr.map((obj,index)=>{
        return (
            <li className={index==(log_arr.length-1) ? "highlighted" : undefined}>
                Player {obj.player} plays at {obj.row},{obj.col}</li>
        )
      })}
    </ol>
  );
}
