import {useParams} from 'react-router-dom';

export default function Product(){
    const params = useParams();

    return <>
    <h1>Its my Product !!</h1> 
    <h1>Hope u liked {params.productId}</h1> 
    </>;
}