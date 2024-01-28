import { Outlet, useNavigation } from "react-router-dom";
import "./navbar.css";
import ImageHolder from "../../miniComponents/ImageHolder.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../miniComponents/Loading.jsx";
import Loading2 from "../../miniComponents/Loading2.jsx";
import { useSelector, useDispatch } from "react-redux";
import getUserDetails from "../../apis/getUserDetails.js";
import getCurrentPrice from "../../apis/getCurrentPrice.js";
import intialiseSharing from "../../apis/intialiseSharing.js";
import initialiseHistory from "../../apis/initialiseHistory.js";
import { userActions, shareActions ,historyActions} from "../../redux/store.js";
import Error from "./Error.jsx";
export default function Navbar() {
  // get userDetails from redux store
  const userDetails = useSelector((state) => state.user.details);
  const sharingDetails = useSelector((state) => state.share);
  const historyArr = useSelector((state)=> state.history.historyArr);
  const dispatch = useDispatch();

  // false means still loading
  // data format -> success : true -> page data loaded successfull , data : {pageData}
  // data format -> success : false -> redirect -> true... login page
  // data format -> success : false -> redirect -> false... error page, msg : {errmsg}
  const [pageData, setPageData] = useState(false);

  // only to set intial page
  // this goes on above currentPage useState
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
  const [currentPage, setCurrentPage] = useState({
    path: location.pathname,
    num: getGlowNum(location.pathname),
  });

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/landing");
  }
  function navFunction(to) {
    setPageData(false);
    let glowNum = getGlowNum(to);
    setCurrentPage({ path: to, num: glowNum });
    navigate(to);
  }

  let bkClassNames = "bk_elements";
  if (!pageData) bkClassNames += " loading-bk";
  if (currentPage.path == "/chart") bkClassNames += " chartBk";

  useEffect(() => {
    if (currentPage.path == "/") {
      if (userDetails == null) {
        async function networkCall() {
          let myData = await getUserDetails();
          if (myData.success) {
            dispatch(userActions.setUserDetails(myData));
            setPageData({ ...myData });
          } else if (myData.redirect) logout();
          else setPageData({ ...myData });
        }
        networkCall();
      } else setPageData({ ...userDetails });
    } else if (currentPage.path == "/chart") {
      if (userDetails == null) {
        async function networkCall() {
          let myData = await getUserDetails();
          if (myData.success) {
            dispatch(userActions.setUserDetails(myData));
            let priceResponse = await getCurrentPrice();
            console.log("priceResponse : ", priceResponse);
            if (priceResponse.success) {
              console.log("yessssssssssssssssssssssssssssssssssssssssssss");
              setPageData({ ...myData, price: priceResponse.price });
            } else {
              console.log("no-----------------------------------------------");
              setPageData({ ...priceResponse });
            }
            // setPageData({...myData});
          } else if (myData.redirect) logout();
          else setPageData({ ...myData });
        }
        networkCall();
      } else {
        async function networkCall() {
          let priceResponse = await getCurrentPrice();
          if (priceResponse.success) {
            setPageData({ ...userDetails, price: priceResponse.price });
          } else {
            setPageData({ ...priceResponse });
          }
        }
        networkCall();
      }
    } else if (currentPage.path == "/share") {
      if (sharingDetails.loaded) {
        // setPageData({ ...sharingDetails, success: true });
        setPageData({ success: true });
      } else {
        async function networkCall() {
          const response = await intialiseSharing();
          if (response.success) {
            dispatch(shareActions.intialise(response));
            setPageData({ success: true });
          } else if (response.redirect) logout();
          else setPageData({ ...response });
        }
        networkCall();
      }
    } else if (currentPage.path=="/history"){
      if (historyArr!==null) {
        setPageData({ success: true });
      } else {
        async function networkCall() {
          const response = await initialiseHistory();
          if (response.success) {
            dispatch(historyActions.initalise(response.historyArray));
            setPageData({ success: true });
          } else if (response.redirect) logout();
          else setPageData({ ...response });
        }
        networkCall();
      }
    }
  }, [currentPage]);

  return (
    <div id="authPages">
      <div id="navbar">
        <div id="navIcons">
          <div id="glower_wrapper" className={"glow" + currentPage.num}>
            <div id="glower"></div>
          </div>
          <ImageHolder
            name="homeIcon.png"
            isActive={currentPage.path == "/"}
            clickHandler={() => navFunction("/")}
          />
          {/* <ImageHolder name="chartIcon.png" isActive={page.path=="/chart"} to="/chart" /> */}
          <ImageHolder
            name="chartIcon.png"
            isActive={currentPage.path == "/chart"}
            clickHandler={() => navFunction("/chart")}
          />
          {/* <ImageHolder name="shareIcon.png" isActive={page.path=="/share"} to="/share" /> */}
          <ImageHolder
            name="shareIcon.png"
            isActive={currentPage.path == "/share"}
            clickHandler={() => navFunction("/share")}
          />
          {/* <ImageHolder name="historyIcon.png" isActive={page.path=="/history"} to="/history" /> */}
          <ImageHolder
            name="historyIcon.png"
            isActive={currentPage.path == "/history"}
            clickHandler={() => navFunction("/history")}
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
          {pageData ? (
            pageData.success ? (
              <Outlet context={pageData} />
            ) : (
              <Error msg={pageData.msg} />
            )
          ) : (
            <Loading2 />
          )}
        </div>
      </div>
    </div>
  );
}
