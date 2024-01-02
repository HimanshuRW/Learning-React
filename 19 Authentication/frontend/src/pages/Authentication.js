import AuthForm from '../components/AuthForm';
import {redirect} from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}){
  let queryParams = new URL(request.url).searchParams;
  const mode = queryParams.get('mode') || 'login';

  const data = await request.formData();
  const authData = {
    email : data.get('email'),
    password : data.get('password'),
  };

  const response = await fetch('http://localhost:8080/'+mode,{
    method : 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(authData)
  });

  if (response.status == 422 || response.status==401) {
    return response;
  }

  if (!response.ok) {
    console.log("issue !!!!");
    throw response;
  }

  const resData = await response.json();
  const token = resData.token;

  // save as cookie or in localStorage

  return redirect('/');
}