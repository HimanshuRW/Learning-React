import styles from "./Share.module.css";
import { useSelector } from "react-redux";


export default function Share() {
  const sharingDetails = useSelector((state) => state.share);
  console.log("My data in share : ",sharingDetails);
  return <h1>Share</h1>;
}