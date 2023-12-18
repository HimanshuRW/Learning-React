import EventForm from '../components/EventForm';
import {useRouteLoaderData} from 'react-router-dom';

function EditEvent() {
  const data = useRouteLoaderData('event_detail_id');

    return <EventForm event={data.event}/>;
  }
  
  export default EditEvent;
  