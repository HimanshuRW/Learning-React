import { Await,defer,useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
  let loaderData = useLoaderData();
  console.log(loaderData);

  return (
    <Suspense fallback={<p style={{textAlign:'center'}}>Loading....</p>}>
      <Await resolve={loaderData.myEvents}>
        {(resolvedData) => <EventsList events={resolvedData} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    //setError('Fetching events failed.');
    console.log("error from backend");
    // u can thro error also
    // or
    throw new Response("not got the data", { status: 500 });
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData.events;
  }
}

export const loader = async () => {
    return defer({
      myEvents: loadEvents()
    });
}
