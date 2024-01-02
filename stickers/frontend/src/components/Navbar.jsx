import { NavLink } from "react-router-dom";
import HomeIcon from '../miniComponents/HomeIcon';

export default function Navbar(){
    return <nav>
        <NavLink to="/" className={({isActive})=>isActive ? 'active' : undefined}>
            <HomeIcon />
        </NavLink>
        <NavLink to="/chart" className={({isActive})=>isActive ? 'active' : undefined}>Chart</NavLink>
        <NavLink to="/sharing" className={({isActive})=>isActive ? 'active' : undefined}>Sharing</NavLink>
        <NavLink to="/history" className={({isActive})=>isActive ? 'active' : undefined}>History</NavLink>
        <NavLink to="/search" className={({isActive})=>isActive ? 'active' : undefined}>Users</NavLink>
        <NavLink to="/top" className={({isActive})=>isActive ? 'active' : undefined}>Top</NavLink>
    </nav>
} 