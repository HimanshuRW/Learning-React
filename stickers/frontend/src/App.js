import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import authCheck from './helpers/authCheck.js';
import Landing,{action as landingAction} from './pages/unAuth/Landing.jsx';
import './App.css';

const router = createBrowserRouter([
  {
    path : "/",
    element : <h1>Himanshu</h1>,
    loader : authCheck,
    children : [
      { path : '/', element : <h2>Home</h2> },
      { path : '/a', element : <h2>a</h2> },
      { path : '/b', element : <h1>b</h1> }
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