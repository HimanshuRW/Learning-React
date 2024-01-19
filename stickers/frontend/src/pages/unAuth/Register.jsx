import { useEffect } from "react";
import useAnimate from "../../Hooks/useAnimate.js";
import { Form, useActionData, useNavigation } from "react-router-dom";

export default function Register({ setPage }) {
  useEffect(()=>{
    let dancingIconArea = document.getElementById("dancingIcon-container");
    dancingIconArea.className=" new-dancingIcon-container";
    let content = document.getElementById("landingPage-content");
    content.className=" new-landingPage-content";
    
    return ()=>{
      dancingIconArea.className="";
      content.className="";
    } 
  },[]);
  const navigation = useNavigation();
  const isSubmmiting = navigation.state === "submitting";
  const { isVisible, goto } = useAnimate(setPage);
  const animateup = `animated-component ${isVisible ? "visible" : "hidden-up"}`;
  const animatedown = `animated-component ${isVisible ? "visible" : "hidden-down"}`;
  let actionData = useActionData();

  return (
    <Form method="POST">
      <div className="landing-account">
        <h2 className={animateup}>Register</h2>
        {actionData ? actionData.for=="register"? <p id="errMsg" className={animateup}>{actionData.msg}</p> : null : null}
        {/* <div className="register-inputs"> */}
          <input
            type="text"
            name="name"
            placeholder="Name..."
            className={"bigInputs " + animateup}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email..."
            className={"bigInputs " + animateup}
            required
          />
          <input
            type="password"
            name="pass"
            placeholder="Password..."
            className={"bigInputs " + animateup}
            required
          />
          <input
            type="password"
            name="confPass"
            placeholder="Confirm Password..."
            className={"bigInputs " + animateup}
            required
          />
          <input type ="hidden" name="to" value="register" />
        {/* </div> */}
        <button
          type={isSubmmiting ? "button" : "submit"}
          className={`gradientBtn strechBtn btn ${animatedown}`}
        >
          {isSubmmiting ? "Submitting..." : "Register"}
        </button>
        <p
          id="whiteMsg"
          className={animatedown}
          onClick={() => goto("landing")}
        >
          &larr; Back
        </p>
      </div>
    </Form>
  );
}
