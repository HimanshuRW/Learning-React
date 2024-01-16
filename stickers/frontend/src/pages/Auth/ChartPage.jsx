import { redirect, Await, useLoaderData } from "react-router-dom";
import "./Chart.css";
import Transect from "../../components/Transect.jsx";
import Chart from "../../components/Chart.jsx";
import { Fragment, Suspense } from "react";

function SidePart({ data }) {
  console.log("in the sidePart comp");
  console.log("data is : ", data);
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
      <Transect profit={data.profit} showSell={data.coins>0} totalCoins={data.coins} price={data.price} />
    </div>
  );
}

export default function ChartPage() {
  const data = useLoaderData();

  return (
    <div id="chartPage">
      <Chart />
      <Suspense fallback={<h2 style={{ textAlign: "center" }}>Loading....</h2>}>
        <Await resolve={data}>
          {(resolvedData) => <SidePart data={resolvedData} />}
        </Await>
      </Suspense>
    </div>
  );
}

async function loadData() {
  try {
    const token = localStorage.getItem("authToken");
    if (token == null) return redirect("/landing");
    const coinResponse = await fetch("http://localhost:8080/chartPage/" + token);
    const priceResponse = await fetch("http://localhost:8080/price");
    // make a request for checking if user have profit or loss and by how much % if sell right now
    if (!coinResponse.ok) return redirect("/landing");
    // error page
    // if(!priceResponse.ok) return redirect("/landing");
    let price = await priceResponse.text();
    price = parseInt(price);
    let coins = await coinResponse.text();
    coins = parseInt(price);
    return {
      price: price,
      coins: coins,
    };
  } catch (error) {
    // error page
    console.log("returning the data now and then ---");
    return {
      price: 200,
      coins: 2,
      profit : 40
    };
  }
}

export const loader = async () => {
  return loadData(); // its a promise tey to resolve
};
