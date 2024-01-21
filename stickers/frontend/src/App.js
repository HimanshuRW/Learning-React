import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import authCheck from './helpers/authCheck.js';
import Landing,{action as landingAction} from './pages/unAuth/Landing.jsx';
import Navbar from './pages/Auth/Navbar.jsx';
import Home from "./pages/Auth/Home.jsx";
import History from './pages/Auth/History.jsx';
import Users from './pages/Auth/Users.jsx';
import Share from './pages/Auth/Share.jsx';
import Chart from './pages/Auth/ChartPage.jsx';
import './App.css';


const router = createBrowserRouter([
  {
    path : "/",
    element : <Navbar />,
    loader : authCheck,
    children : [
      { index : true, element : <Home /> },
      { path : '/chart', element : <Chart />},
      { path : '/share', element : <Share /> },
      { path : '/history',element: <History /> },
      { path : '/users', element : <Users /> }
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