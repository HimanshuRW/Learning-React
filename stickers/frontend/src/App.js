import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Root,{rootLoader} from './pages/Root.js';
import Login from './pages/Login.js';
import Profile from './components/Profile.jsx';
import './App.css';

const router = createBrowserRouter([
  {
    path : "/",
    element : <Root />,
    loader : rootLoader,
    id : 'user-cookie',
    children : [
      { path : '/', element : <Profile /> },
    ]
  },
  {
    path : "/login",
    element : <Login />
  }
])


function App() {
  return <RouterProvider router={router}/>
}
export default App;