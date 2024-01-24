import { Fragment } from "react";
import {useSelector} from "react-redux";

export default function Msg({styles}){
    const msg = useSelector((state) => state.askCoins.msg);
    return (
      <Fragment>
      {msg !== null ? 
        <p
          className={
            styles.msg + " " + (msg.success ? styles.success : styles.fail)
          }
        >
          {msg.msg}
        </p>
       : null}
       </Fragment>
      )
}