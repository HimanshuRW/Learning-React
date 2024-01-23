export default function OutGoingRequestList({ myArr, setError,styles }) {
    return (
      <div className={styles.requestList}>
        {myArr.map((personObj, index, arr) => {
          return (
            <div className={styles.card}>
              <div className={styles.name}>{personObj.name}</div>
              <div className={styles.request}>
                {/* <button className={styles.give}>Give <span className={styles.coinIcon}></span>{personObj.coins}</button> */}
                <p>
                  For {personObj.coins}{" "}
                  <img src="/imgs/ethereumGold.png" alt="" srcset="" />{" "}
                </p>
                <button className={styles.reject} onClick={setError}>
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }