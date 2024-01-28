import { useEffect, useState } from "react";
import Graph from "../miniComponents/Graph.jsx";
import getChartData from "../apis/getChartData.js";

export default function Chart({avg}){
    const [range,setRange] = useState("day");
    const [grapghData,set_graphData] = useState(null);
    console.log("cahrt component rendering");

    useEffect(()=>{
        console.log("usse effect of chart component");
        set_graphData(null);
        async function getData(){
            try {
                let response = await getChartData(range);
                set_graphData(response); 
            } catch (err) {
                set_graphData({success : false, msg: "Server Issue... Try again later !"})
            }
        }
        getData();
    },[range]);

    function updateRange(value){
        if(range!==value){
            set_graphData(null);
            setRange(value);
        }
    }
    
    return (
        <div id="graph_container">
            {grapghData==null ? <LoadingGraph /> :(grapghData.success? <Graph graphData={grapghData.chartData} range={range} avg={avg} /> : <Err msg={grapghData.msg} />)}
            {/* {grapghData==null ? <LoadingGraph /> : <h1>is it my mistake that i cant get u out of my head !!!</h1>} */}
            <div id="graphBtns">
                <button id="graphBtnIcon" className="graphBtn_active">Icon</button>
                <button className={range=="day" ? "graphBtn_active" : "graphBtn_unactive"} onClick={()=>updateRange("day")}>1D</button>
                <button className={range=="week" ? "graphBtn_active" : "graphBtn_unactive"} onClick={()=>updateRange("week")}>1W</button>
                <button className={range=="month" ? "graphBtn_active" : "graphBtn_unactive"} onClick={()=>updateRange("month")}>1M</button>
                <button className={range=="year" ? "graphBtn_active" : "graphBtn_unactive"} onClick={()=>updateRange("year")}>1Y</button>
            </div>
        </div>
    );
}

function LoadingGraph(){
    return <div class="dot-revolution"></div>
}
function Err({msg}){
    console.log("msg shown");
    return <div class="chartErr">Error : {msg}</div>
}