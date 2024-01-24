import styles from "./Share.module.css";
import { useSelector } from "react-redux";
import OutGoingRequestContainer from "../../components/share/OutGoingRequestContainer.jsx";
import IncomingReqestConatiner from "../../components/share/IncomingRequests.jsx";

export default function Share() {
  const sharingDetails = useSelector((state) => state.share);
  
  return (
    <div className={styles.pageWrapper}>
      <IncomingReqestConatiner myArr={sharingDetails.giveTo} styles={styles} />
      <OutGoingRequestContainer myArr={sharingDetails.askedTo} styles={styles} />
    </div>
  );
}