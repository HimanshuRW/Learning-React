import { useEffect,useState } from "react";


export function useFetch(fetch_fn,startingValue) {
    const [fetchedData, setfetchedData] = useState(startingValue);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const myData = await fetch_fn();
                setfetchedData(myData);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data.' });
            }

            setIsFetching(false);
        }

        fetchData();
    }, [fetch_fn]);

    return{
        isFetching,fetchedData,error,setfetchedData
    }
}