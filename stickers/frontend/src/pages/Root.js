import { Fragment } from 'react';
import {redirect,Outlet } from 'react-router-dom';

export default function Root() {
  return <Fragment>
    <h1>Navbar here</h1>
    <Outlet />
  </Fragment>
}

export const rootLoader = async ()=>{
  const isAuthenticated = checkAuthentication();
  if(isAuthenticated){
    // make api call to get the info to get info like no of stickers it posses.. email.. name.. 
    let user = {
      name : "Himanshu",
      email : "himanshu@gmail.com",
      wealth : 22,
      img : '/profilePics/himanshu.jpg'
    }
    return user;
  } else return redirect("/landing");
};

function checkAuthentication() {
  // Check if the authentication cookie is present in local storage
  return localStorage.getItem('authToken') !== null;
};