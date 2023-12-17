import {Outlet} from 'react-router-dom';
import Nav from '../components/nav';

export default function Products(){
    return <>
    <h1>Root is here</h1> 
    <Nav />
    <Outlet />
    </>;
}