import React, { lazy, Suspense } from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import authCheck from './helpers/authCheck.js';
import Landing,{action as landingAction} from './pages/unAuth/Landing.jsx';
import Navbar from './pages/Auth/Navbar.jsx';
import Home from "./pages/Auth/Home.jsx";
import History from './pages/Auth/History.jsx';
// import Share, {loader as shareLoader} from './pages/Auth/Share.jsx';
import Chart from './pages/Auth/ChartPage.jsx';
import './App.css';

const SharePage = lazy(()=>import('./pages/Auth/Share.jsx'));


const router = createBrowserRouter([
  {
    path : "/",
    element : <Navbar />,
    loader : authCheck,
    children : [
      { index : true, element : <Home /> },
      { path : '/chart', element : <Chart />},
      { path : '/share', element : (
        <Suspense fallback={<p>Loading...</p>}>
          <SharePage />
        </Suspense>
      ), loader:async ()=>{
            let module = await import("./pages/Auth/Share.jsx");
            return module.loader(); 
        }},
      { path : '/history',element: <History /> },
    ]
  },
  {
    path : "/landing",
    element : <Landing />,
    action : landingAction
  }
])


function App() {
  return <RouterProvider router={router}/>
}
export default App;