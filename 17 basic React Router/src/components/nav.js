import { NavLink } from "react-router-dom";
export default function Nav(){
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={({isActive})=>isActive ? 'active' : undefined}>Home</NavLink>
                        <NavLink to="/products" className={({isActive})=>isActive ? 'active' : undefined}>Products</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}