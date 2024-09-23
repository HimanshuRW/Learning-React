import GradientBtn from "../../miniComponents/GradientBtn.jsx";
import GreyBtn from "../../miniComponents/GreyBtn.jsx";
import useAnimate from "../../Hooks/useAnimate.js";

export default function Intro({setPage}) {
  const { isVisible, goto } = useAnimate(setPage);
  const animateup = `animated-component ${isVisible ? "visible" : "hidden-up"}`;
  const animatedown = `animated-component ${isVisible ? "visible" : "hidden-down"}`;
  console.log("into isvisible : ",isVisible);
  return (
    <div className="landing-account">
      <h2 className={animateup}>Create a free Account</h2>
      <GradientBtn isVisible={isVisible} onClick={() => goto("register")}>
        Create an account
      </GradientBtn>
      <GreyBtn isVisible={isVisible} onClick={() => goto("login")}>
        Login
      </GreyBtn>
      <p className={`greyText madeby ${animatedown}`}>Made by Girish</p>
    </div>
  );
}
