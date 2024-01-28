import styles from "./Share.module.css";
import OutGoingRequestContainer from "../../components/share/OutGoingRequestContainer.jsx";
import IncomingReqestConatiner from "../../components/share/IncomingRequests.jsx";

export default function Share() {
  return (
    <div className={styles.pageWrapper}>
      <IncomingReqestConatiner styles={styles} />
      <OutGoingRequestContainer styles={styles} />
    </div>
  );
}

export function loader(){
  console.log("loader function of Share page");
  return null;
}