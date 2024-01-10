import useAnimate from "../../Hooks/useAnimate.js";
import { Form, useActionData ,useNavigation} from "react-router-dom";

//.. component ...

export default function Login({setPage}) {
  const navigation = useNavigation();
  const isSubmmiting = navigation.state==='submitting';
  const { isVisible, goto } = useAnimate(setPage);
  const animateup = `animated-component ${isVisible ? "visible" : "hidden-up"}`;
  const animatedown = `animated-component ${isVisible ? "visible" : "hidden-down"}`;
  const actionData = useActionData();

  return (
    <Form method="POST">
      <div className="landing-account">
        <h2 className={animateup}>Login</h2>
        {actionData ? actionData.for=="login"? <p id="errMsg" className={animateup}>{actionData.msg}</p> : null : null}
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
        <input type ="hidden" name="to" value="login" />
        <button
          type={isSubmmiting ? "button" : "submit"}
          className={`gradientBtn strechBtn btn ${animatedown}`}
        >
          {isSubmmiting ? "Logging..." : "Login"}
        </button>
        <p id="whiteMsg" className={animatedown} onClick={()=>goto("landing")}>&larr; Back</p>
      </div>
    </Form>
  );
}
