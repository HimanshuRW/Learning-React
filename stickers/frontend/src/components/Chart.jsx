import { useEffect, useState } from "react";
import Graph from "../miniComponents/Graph.jsx";

export default function Chart(){
    const [range,setRange] = useState("day");
    const [isloading, set_isloading] = useState(true);

    let graphData={
        avg : 50
    };
    useEffect(()=>{
        set_isloading(false);
        async function getData(){
            try {
                let response = await fetch("http://localhost:8080/chart/"+range);
                let body = await response.json();    
            } catch (err) {
                console.log("setting it false");
                // setTimeout(()=>{
                    // set_isloading(false);
                // },2);
            }
        }
        getData();
    },[range]);

    function updateRange(value){
        if(range!==value){
            set_isloading(true);
            setRange(value);
        }
    }
    
    return (
        <div id="graph_container">
            {isloading ? <LoadingGraph /> : <Graph graphData={graphData} />}
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
    // return <div id="traffic-chart"></div>
}