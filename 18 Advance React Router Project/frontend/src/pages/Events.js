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

// ------- working -----
// import { Await, defer, useLoaderData } from 'react-router-dom';
// import EventsList from '../components/EventsList';
// import { Suspense } from 'react';

// function EventsPage() {
//   // Ensure useLoaderData is correctly configured in your route
//   let loaderData = useLoaderData();
//   console.log(loaderData);

//   return (
//     <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading....</p>}>
//       <Await resolve={loaderData.myEvents}>
//         {(resolvedData) => (
//           resolvedData ? (
//             <EventsList events={resolvedData} />
//           ) : (
//             <p style={{ textAlign: 'center' }}>No events found.</p>
//           )
//         )}
//       </Await>
//     </Suspense>
//   );
// }

// export default EventsPage;

// async function loadEvents() {
//   try {
//     const response = await fetch('http://localhost:8080/events');
    
//     if (!response.ok) {
//       console.log('Error from backend:', response.statusText);
//       throw new Error('Failed to fetch events.');
//     }

//     const resData = await response.json();
//     console.log(resData);
//     return resData.events;
//   } catch (error) {
//     console.error('Error loading events:', error);
//     throw error;
//   }
// }

// // Ensure loader returns a promise
// export const loader = async () => {
//   try {
//     const myEvents = await loadEvents();
//     return { myEvents };
//   } catch (error) {
//     console.error('Loader error:', error);
//     throw error;
//   }
// };