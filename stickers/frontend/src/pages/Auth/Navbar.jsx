import { Outlet, useNavigation } from "react-router-dom";
import "./auth.css";
import ImageHolder from "../../miniComponents/ImageHolder.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../../miniComponents/Loading.jsx";
import Loading2 from "../../miniComponents/Loading2.jsx";

export default function Navbar() {
  const {state} = useNavigation();
  const [page, setPage] = useState({
    path: "/",
    num: 1,
  });
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/landing");
  }
  function navFunction(to) {
    let glowNum = 0;
    if (to == "/") glowNum = 1;
    else if (to == "/chart") glowNum = 2;
    else if (to == "/share") glowNum = 3;
    else if (to == "/history") glowNum = 4;
    else glowNum = 5;
    setPage({ path: to, num: glowNum });
    navigate(to);
  }
  return (
    <div id="authPages">
      <div id="navbar">
        <div id="navIcons">
          <div id="glower_wrapper" className={"glow" + page.num}>
            <div id="glower"></div>
          </div>
          <ImageHolder
            name="homeIcon.png"
            isActive={page.path == "/"}
            clickHandler={() => navFunction("/")}
          />
          {/* <ImageHolder name="chartIcon.png" isActive={page.path=="/chart"} to="/chart" /> */}
          <ImageHolder
            name="chartIcon.png"
            isActive={page.path == "/chart"}
            clickHandler={() => navFunction("/chart")}
          />
          {/* <ImageHolder name="shareIcon.png" isActive={page.path=="/share"} to="/share" /> */}
          <ImageHolder
            name="shareIcon.png"
            isActive={page.path == "/share"}
            clickHandler={() => navFunction("/share")}
          />
          {/* <ImageHolder name="historyIcon.png" isActive={page.path=="/history"} to="/history" /> */}
          <ImageHolder
            name="historyIcon.png"
            isActive={page.path == "/history"}
            clickHandler={() => navFunction("/history")}
          />
          {/* <ImageHolder name="userIcon.png" isActive={page.path=="/users"} to="/users" /> */}
          <ImageHolder
            name="userIcon.png"
            isActive={page.path == "/users"}
            clickHandler={() => navFunction("/users")}
          />
        </div>
        <img src="/imgs/logoutIcon.png" alt="" onClick={logout} />
      </div>
      <div id="authPage_backgroud">
        <span id="auth_triangle" className={state=="loading" ? "bk_elements loading-bk" : "bk_elements static-bk"}></span>
        <span id="auth_oval" className={state=="loading" ? "bk_elements loading-bk" : "bk_elements static-bk"}></span>
        <div id="authPage_wrapper">
          {state!=="loading"? <Outlet /> : <Loading />}
        </div>
      </div>
    </div>
  );
}
