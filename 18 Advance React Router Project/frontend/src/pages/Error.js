import {useRouteError} from 'react-router-dom'

export default function ErrorPage(){
    const myError = useRouteError();
    return <h1>{myError.data}</h1>;
}