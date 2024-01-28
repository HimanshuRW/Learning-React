import { useSelector } from "react-redux";
import styles from "./History.module.css";
export default function History() {
  let historyArr = useSelector((state) => state.history.historyArr);
  return (
    <div className={styles.histroyContainer}>
      <h1>History</h1>
      {historyArr.length > 0 ? null : <p>No histroy Data found</p>}
      <div className={styles.wrapper+"  myScroll"}>
        {historyArr.map((historyData) => (
          <div className={styles.wrapperItem}>
            <h3>{historyData.name}</h3>
              <p className={styles.coins}>{historyData.coins}</p>
              <p className={styles.price}>₹ {historyData.price}</p>
            <p className={styles.date}>{historyData.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
