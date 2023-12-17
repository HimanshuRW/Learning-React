import classes from './Header.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../redux/index';



const Header = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn);

  function handle_logout(){
    dispatch(authActions.logout());
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        {loggedIn ?
          <ul>
            <li>
              <a href='/'>My Products</a>
            </li>
            <li>
              <a href='/'>My Sales</a>
            </li>
            <li>
              <button onClick={handle_logout}>Logout</button>
            </li>
          </ul>
          :
          <ul>
            <li>
              <a href='/'>First Login</a>
            </li>
          </ul>
        }
      </nav>
    </header>
  );
};

export default Header;
