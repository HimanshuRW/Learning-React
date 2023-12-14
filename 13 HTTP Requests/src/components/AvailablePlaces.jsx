import Places from './Places.jsx';
import { useState,useEffect } from 'react';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [available_places,set_available_places] = useState([]);
  const [isloading, set_isloading] = useState(false);
  const [errorMsg, set_errorMsg] = useState()

  useEffect(()=>{
    async function fetchPlaces(){
      set_isloading(true);
      try{
        let response = await fetch('http://localhost:3000/placess');

        if(!response.ok) { throw new Error ("failed to get places from backend") };
        let data = await response.json();
        set_available_places(data.places);
      } catch(err) {
        //...
        console.log(err);
        set_errorMsg({message : err.message || "could not fetch places"})
      } 
      set_isloading(false);
    }
    fetchPlaces();
  },[]);

  if (errorMsg) {
    return <Error title="An Error Occurred" msg={errorMsg.message} />
  }

  return (
    <Places
      title="Available Places"
      places={available_places}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isloading = {isloading}
    />
  );
}
