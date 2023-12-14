import classes from './User.module.css';
import { Component  } from 'react';

class User extends Component {
  // component make an obj with all given porp as props
  render(){
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
