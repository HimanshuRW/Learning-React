import { Fragment } from "react";
import DancingIcon from "../../miniComponents/DancingIcon.jsx";
import LandPage from "./LandPage.jsx";
import registerAction from "../../helpers/register.js";
import loginAction from "../../helpers/login.js";
import { styled } from "styled-components";
import cssCode from "./cssExporter.js";

const CSSWrapper = styled.div`
  ${cssCode}
`;

export default function Landing() {
  return (
    <CSSWrapper>
      <div id="landingPage">
        <DancingIcon />
        <LandPage />
      </div>
    </CSSWrapper>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const where = formData.get("to");
  if (where == "login") {
    let ans = await loginAction(formData);
    return ans;
  } else {
    let ans = await registerAction(formData);
    return ans;
  }
}
