import { Fragment } from "react";
import { useSelector,useDispatch } from "react-redux";
import { askCoinsActions } from '../../redux/store';

export default function UpperPart({ styles }) {
  const comp = useSelector((state) => state.askCoins.comp);
  const dispatch = useDispatch();

  console.log("Comp is : ",comp);

  function shift() {
    if (comp == "sent") dispatch(askCoinsActions.setComp("search"));
    else dispatch(askCoinsActions.setComp("sent"));
  }

  return (
    <Fragment>
      <p onClick={shift} className={styles.shift}>
        {comp == "sent" ? "« Send a Request" : "Requests Sent ! »"}
      </p>
      <h2
        className={
          styles.slide + " " + (comp == "sent" ? styles.show : styles.hide_left)
        }
      >
        Requests Sent !
      </h2>
      <h2
        className={
          styles.slide +
          " " +
          (comp == "ask" || comp == "search" ? styles.show : styles.hide_right)
        }
      >
        Send a Request...
      </h2>
    </Fragment>
  );
}
