import EventItem from '../components/EventItem';
import {useRouteLoaderData} from 'react-router-dom';

function EventDetail() {
  const data = useRouteLoaderData('event_detail_id');
  return (
    <EventItem event={data.event} />
  );
}

export default EventDetail;

export const loader =async ({request,params})=>{
  const id = params.id;
  const response = await fetch('http://localhost:8080/events/'+id);
  if (!response.ok) {
    throw new Response("Invalid iD : "+id,{status:500});
  } else {
    return response;
  }
}