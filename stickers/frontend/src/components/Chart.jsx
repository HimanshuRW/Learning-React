import { useEffect, useState } from "react";
import Graph from "../miniComponents/Graph.jsx";

export default function Chart({avg}){
    const [range,setRange] = useState("day");
    const [grapghData,set_graphData] = useState(null);

    useEffect(()=>{
        set_graphData(null);
        async function getData(){
            try {
                // let response = await fetch("http://localhost:8080/chart/"+range);
                let response = await fetch("http://localhost:3000/db/coin"+range+".json");
                let body = await response.json(); 
                console.log("body is hereeeeeeeeeeeeeeee ",body);  
                set_graphData(body); 
            } catch (err) {
                setTimeout(()=>{
                    let sampleData = [
                        { timestamp: "01-01-2024 18:30", price: 100 },
                        { timestamp: "02-01-2024 19:00", price: 120 },
                        { timestamp: "03-01-2024 19:30", price: 60 },
                        { timestamp: "04-01-2024 20:00", price: 70 },
                        { timestamp: "05-01-2024 20:30", price: 50 },
                        { timestamp: "06-01-2024 20:30", price: 180 },
                        { timestamp: "07-01-2024 20:30", price: 110 },
                        // Add more data as needed
                    ];
                    set_graphData(sampleData);
                },2);
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
            {grapghData==null ? <LoadingGraph /> : <Graph graphData={grapghData} range={range} avg={avg} />}
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
    // return <div id="traffic-chart"></div>
}