import { redirect, Await, useLoaderData } from "react-router-dom";
import "./Chart.css";
import Transect from "../../components/Transect.jsx";
import Chart from "../../components/Chart.jsx";
import { Fragment, Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import getChartData from "../../apis/getChartData.js";

function SidePart({ data }) {
  let ratio = ((data.price)/(data.avg));
  const profit = ((ratio- 1) * 100).toFixed(2);
  return (
    <div id="sidePart">
      <div className="showcase">
        <div className="priceBar sheet">
          <span className="showCoin">JIIT Coin</span>
          <span>&#8377;{data.price}</span>
        </div>
        <div className="priceBar sheet">
          <span>You own</span>
          <span>{data.coins}</span>
        </div>
      </div>
      <Transect
        profit={profit}
        showSell={data.coins > 0}
        totalCoins={data.coins}
        price={data.price}
      />
    </div>
  );
}

export default function ChartPage() {
  const [data, setData] = useState(null);
  useEffect(async () => {
    const toset = await getChartData("day");
    setData(toset);
  }, []);
  console.log("data --------- ",data);
  return (
    <div id="chartPage">
      <Chart avg={data.avg} />
      <SidePart data={data} />
    </div>
  );
}
