import {Link} from 'react-router-dom';

export default function Home(){
    return <>
    <h1>Home page here</h1> 
    <p>Go to <Link to='/products'>Products</Link></p>
    </>;
}