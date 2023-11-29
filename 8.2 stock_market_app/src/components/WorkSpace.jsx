export default function WorkSpace({update}){
    return (
        <div className="controls">
            <button id="buy" onClick={update.up} >Buy</button>
            <button id="sell" onClick={update.down} >Sell</button>
        </div>
    )
}