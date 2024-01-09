import { Fragment } from "react";
import DancingIcon from "../miniComponents/DancingIcon.jsx";
import GradientBtn from "../miniComponents/GradientBtn.jsx";

export default function Login() {
    return <Fragment>
        <DancingIcon />
        <div className="landing-account">
            <h2>Create a free Account</h2>
            <GradientBtn>Create an account</GradientBtn>
        </div>

    </Fragment>
}