import { Fragment, useState } from "react";
import useAnimate from "../Hooks/useAnimate";

export default function Transect({ profit, showSell, price, totalCoins }) {
  let vari = { profit, showSell, price, totalCoins };
  console.log("vari : ",vari);
  const [state, setState] = useState("default");
  const [coinsState, set_coinsState] = useState(totalCoins);
  const [myError, setError] = useState(null);
  const { isVisible, goto } = useAnimate(setState);
  const animateup = `animated-component ${isVisible ? "visible" : "hidden-up"}`;
  const animatedown = `animated-component ${
    isVisible ? "visible" : "hidden-down"
  }`;
  const animateRight = `animated-component ${
    isVisible ? "visible" : "hidden-right"
  }`;
  const animateLeft = `animated-component ${
    isVisible ? "visible" : "hidden-left"
  }`;

  function setSell() {
    if (state == "default") goto("sell");
  }
  function sellCoins() {
    console.log("get ruppess : " + getValue(coinsState, price, "sell"));
  }
  function buyCoins() {
    console.log("pay ruppess : " + getValue(coinsState, price, "buy"));
  }
  function inputChange(coinInput) {
    coinInput.preventDefault();
    let myKey = parseInt(coinInput.key);
    if (myError !== null) {
      setError(null);
    }
    let oldStr = coinInput.target.value;
    if (!isNaN(myKey)) {
      let newStr = oldStr + myKey;
      let newNum = parseInt(newStr);
      if (state == "buy") {
        coinInput.target.value = newNum;
        set_coinsState(newNum);
      } else if (newNum <= totalCoins) {
        coinInput.target.value = newNum;
        set_coinsState(newNum);
      } else {
        setError("Not sufficient coins...");
      }
    } else if (coinInput.key == "Backspace") {
      console.log(oldStr);
      if (oldStr.length > 0) {
        let newStr = oldStr.slice(0, -1);
        if (newStr.length == 0) {
          coinInput.target.value = 0;
          set_coinsState(0);
        } else {
          let newNum = parseInt(newStr);
          coinInput.target.value = newNum;
          set_coinsState(newNum);
        }
      }
    }
  }
  console.log("coinsState : ", coinsState);
  function setBuy() {
    if (state == "default") {
      setState("buy");
      set_coinsState(1);
    }
  }
  function setDefault() {
    setError(null);
    set_coinsState(totalCoins);
    setState("default");
  }
  return (
    <div className="transect_container">
      {/* {state!=="default" ? <div className="inputWrapper upBtn"><input type="number" name="coinsDelt" className="upBtn" placeholder="Coins..." /> </div> : "hidden-right"} */}
      {myError ? <p>{myError}</p> : null}
      <div
        className={
          state !== "default" ? "inputWrapper upBtn" : "hidden-right-Btn"
        }
      >
        {state !== "default" ? (
          <input
            type="text"
            onKeyDown={inputChange}
            name="coinsDelt"
            className="upBtn"
            placeholder="Coins..."
            defaultValue={coinsState}
          />
        ) : null}
      </div>
      {showSell ? (
        <button
          onClick={state == "sell" ? sellCoins : setSell}
          id="sellBtn"
          className={`${profit < 0 ? "fail" : "success"} ${
            state == "default"
              ? "upBtn"
              : state == "sell"
              ? "downBtn"
              : "hidden-left-Btn"
          }`}
        >
          <span>{state == "sell" ? "Get" : "Sell"}</span>
          {state == "sell" ? (
            <span>₹{getValue(coinsState, price, "sell")}</span>
          ) : profit < 0 ? (
            <span>&#8659; {profit}%</span>
          ) : (
            <span>&#8657; {profit}%</span>
          )}
        </button>
      ) : null}
      <button
        id="buyBtn"
        onClick={state == "buy" ? buyCoins : setBuy}
        className={
          state == "default" || state == "buy"
            ? "downBtn"
            : "downBtn hidden-left-Btn"
        }
      >
        <div className={state == "buy" ? "split" : "hidden-right-Btn"}>
          <span>Checkout</span>
          <span>₹{getValue(coinsState, price, "buy")}</span>
        </div>
        <div className={state == "buy" ? "hidden-left-Btn" : null}>Buy</div>
      </button>
      <p
        onClick={setDefault}
        className={state !== "default" ? "goBack" : "hidden-down"}
      >
        &#129064; Back
      </p>
    </div>
  );
}

function getValue(coins, price, what) {
  let sum = 0;
  while (coins > 0) {
    sum = sum + price;
    if (what == "buy") price = price + 10;
    else price = price - 10;
    coins--;
  }
  return sum;
}

function sell(coins) {
  console.log("sellinggg " + coins + " coins !");
}

function SellUI({ totalCoins, price, animateRight, profit }) {
  const [coins, setCoins] = useState(totalCoins);

  function update(num) {
    console.log(num, typeof num);
    setCoins(num);
  }

  return (
    <Fragment>
      <input
        type="number"
        placeholder="Enter the coins"
        name="sellingCoins"
        onChange={() => update(this.value)}
      />
      <button onClick={() => sell(coins)} id="sellBtn" className="sellActive">
        <span>Get</span>
        <span>₹ {getValue(coins, price)}</span>
      </button>
    </Fragment>
  );
}

function Default({ setSell, setBuy, animateRight, showSell, profit }) {
  return (
    <Fragment>
      {showSell ? (
        <button
          onClick={setSell}
          id="sellBtn"
          // className={
          //   profit < 0 ? "fail " + animateRight : "success " + animateRight
          // }
        >
          <span>Sell</span>
          {profit < 0 ? (
            <span>&#8659; {profit}%</span>
          ) : (
            <span>&#8657; {profit}%</span>
          )}
        </button>
      ) : null}
      <button id="buyBtn" onClick={setBuy}>
        Buy
      </button>
    </Fragment>
  );
}
