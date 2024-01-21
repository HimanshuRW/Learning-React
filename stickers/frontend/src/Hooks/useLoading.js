import { RouterProvider, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { userActions } from "../../redux/store.js";
import { userActions } from "../redux/store.js";

export default function useLoading() {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.user.details);

    // location to set initial conditions thats landing conditons
    const location = useLocation();
    const navigate = useNavigate();

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

    // false means loading
    const [pageData, setPageData] = useState(false);
    useEffect(() => {
        if (page.path == "/") {
            if (userDetails == null) {
                getUserDetails({ dispatch, userActions, logout, setPageData });
            } else {
                let myData = {
                    success: true,
                    name: userDetails.name,
                    email: userDetails.email,
                    stickers: userDetails.coins,
                };
                setPageData({ ...myData });
            }
        }
        else if (page.path == "/chart") {
            // let currentPrice = getPrice();
            // if (userDetails == null) {
            //     getUserDetails({ dispatch, userActions, logout, setPageData });
            // } else {
            //     let myData = {
            //         success: true,
            //         name: userDetails.name,
            //         email: userDetails.email,
            //         stickers: userDetails.coins,
            //     };
            //     setPageData({ ...myData });
            // }
            getPrice({ dispatch, userActions, logout, setPageData,userDetails });
        }
    }, [page]);

    console.log("pageData : ", pageData);

    function navFunction(to) {
        let glowNum = getGlowNum(to);
        setPage({ path: to, num: glowNum });
        setPageData(false);
        navigate(to);
    }
    function logout() {
        localStorage.clear();
        navigate("/landing");
    }
    return { logout, navFunction, page, pageData };
}


function getUserDetails({ dispatch, userActions, logout, setPageData }) {
    async function main() {
        let fetchedData = await networkCall();
        console.log(fetchedData);
        if (fetchedData.success) {
            dispatch(userActions.setUserDetails(fetchedData));
            setPageData({ ...fetchedData });
        } else if (fetchedData.redirect) {
            logout();
        } else {
            let myData = {
                success: false,
                msg: "Server Issue, Please Try Later",
            };
            setPageData({ ...myData });
        }
    }
    // --------------------------
    async function networkCall() {
        try {
            const token = localStorage.getItem("authToken");
            if (token == null) return { success: false, redirect: true };
            const response = await fetch("http://localhost:8080/user/" + token);
            if (!response.ok) {
                return { success: false, redirect: true };
            }
            let data = await response.json();
            data = { success: true, ...data };
            return data;
        } catch (err) {
            // return {success : false , redirect : false};
            let data = {
                name: "Himanshu Rawat",
                email: "himanshurw@gmail.com",
                stickers: 2,
                avg:90
            };
            data = { success: true, ...data };
            return data;
        }
    }
    main();
}

function getPrice({ dispatch, userActions, logout, setPageData,userDetails }) {
    async function networkCall() {
        if(userDetails==null) getUserDetails({ dispatch, userActions, logout, setPageData});
        let price = "100";
        setPageData({...userDetails,price});
    }
    networkCall();
}