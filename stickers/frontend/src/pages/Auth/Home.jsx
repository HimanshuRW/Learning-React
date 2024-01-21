
import styles from "./Home.module.css";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const data = useOutletContext();

  return (
    <div className={styles.profileCard + " center"}>
      <h2>Hi, {data.name}</h2>
      <div>
        <p>{data.email}</p>
        <p>Coins : {data.coins}</p>
      </div>
    </div>
  );
}