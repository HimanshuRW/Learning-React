import Counter from './components/Counter';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';
import Header from './components/Header';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';


function App() {
  const loggedIn = useSelector(state=> state.auth.loggedIn);

  return (
    <Fragment>
      <Header />
      {loggedIn ? <UserProfile /> : <Auth />}
      <Counter />
    </Fragment>
  );
}

export default App;
