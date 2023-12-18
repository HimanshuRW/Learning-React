import EventForm from '../components/EventForm';
import {redirect} from 'react-router-dom';

function NewEvent() {
    return <EventForm />;
}

export default NewEvent;

export async function action({request,params}){
    const formData = await request.formData();
    const formBody ={
        title : formData.get('title'),
        image : formData.get('image'),
        description : formData.get('description'),
        date : formData.get('date')
    };
    const response = await fetch("http://localhost:8080/events",{
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formBody)
    });
    if(!response.ok){
        throw new Response("cant send data now", {status : 500});
    }
    return redirect('/events');
}