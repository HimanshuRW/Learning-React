import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import authCheck from './helpers/authCheck.js';
import Landing,{action as landingAction} from './pages/unAuth/Landing.jsx';
import Navbar from './pages/Auth/Navbar.jsx';
import Home,{loader as homeLoader} from "./pages/Auth/Home.jsx";
import History from './pages/Auth/History.jsx';
import Users from './pages/Auth/Users.jsx';
import Share from './pages/Auth/Share.jsx';
import Chart,{loader as chartLoader} from './pages/Auth/ChartPage.jsx';
import './App.css';

const router = createBrowserRouter([
  {
    path : "/",
    element : <Navbar />,
    loader : authCheck,
    children : [
      { index : true, element : <Home />,loader:homeLoader },
      { path : '/chart', element : <Chart />,loader:chartLoader },
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