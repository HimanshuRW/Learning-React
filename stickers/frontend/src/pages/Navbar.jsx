import { Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <div id="authPages">
        <div id="navbar">
            
        </div>
        <div id="authPage">
            <Outlet />
        </div>
    </div>
  );
}
