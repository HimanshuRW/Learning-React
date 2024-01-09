import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Root,{rootLoader} from './pages/Root.js';
import Login from './pages/Login.js';
import Landing from './pages/Land.js';
import './App.css';

const router = createBrowserRouter([
  {
    path : "/",
    element : <Root />,
    loader : rootLoader,
    id : 'user-cookie',
    children : [
      { path : '/', element : <h1>Profile</h1> },
    ]
  },
  {
    path : "/login",
    element : <Login />
  },
  {
    path : "/landing",
    element : <Landing />
  }
])


function App() {
  return <RouterProvider router={router}/>
}
export default App;