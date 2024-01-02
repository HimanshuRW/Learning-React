import { Form, Link,useSearchParams,useActionData,useNavigation } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const navigator = useNavigation();
  const action_logs = useActionData();
  const [queryParams,setQueryParams] = useSearchParams();
  const isLogin = queryParams.get('mode')==='login';
  const isSubmitting = navigator.state==='submitting';
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {action_logs && <p>something went wrong</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin?'signup':'login'}`} >
            {isLogin ? 'Create new user' : 'Login'}
            </Link>
            {isSubmitting ? <p>Submitting...</p> : <button>Save</button>}
        </div>
      </Form>
    </>
  );
}

export default AuthForm;