import { Outlet, useNavigation } from "react-router-dom";
import "./navbar.css";
import ImageHolder from "../../miniComponents/ImageHolder.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../miniComponents/Loading.jsx";
import Loading2 from "../../miniComponents/Loading2.jsx";
import {useSelector,useDispatch} from 'react-redux';
import {counterActions} from '../../redux/store.js';

export default function Navbar() {
  const userDetails = useSelector(state=> state.user.details);
  console.log("working : ",userDetails);
  console.log("navbar component");
  const {state} = useNavigation();
  const location = useLocation();

  function getGlowNum(path) {
    let glowNum = 0;
    if (path == "/") glowNum = 1;
    else if (path == "/chart") glowNum = 2;
    else if (path == "/share") glowNum = 3;
    else if (path == "/history") glowNum = 4;
    else glowNum = 5;
    return glowNum;
  }

  const [page, setPage] = useState({
    path: location.pathname,
    num: getGlowNum(location.pathname),
  });

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/landing");
  }
  function navFunction(to) {
    let glowNum = getGlowNum(to);
    setPage({ path: to, num: glowNum });
    navigate(to);
  }
  let bkClassNames = "bk_elements";
  if(state=="loading") bkClassNames += " loading-bk";
  if(page.path=="/chart") bkClassNames += " chartBk";
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
        <span id="auth_triangle" className={bkClassNames}></span>
        <span id="auth_oval" className={bkClassNames}></span>
        {/* <span id="ball" className={bkClassNames}>
          <Ball /></span> */}
        <div id="authPage_wrapper">
          {state!=="loading"? <Outlet /> : <Loading2 />}
        </div>
      </div>
    </div>
  );
}
