import { useSelector } from "react-redux";
import "./History.css";
export default function History() {
  let historyArr = useSelector((state) => state.history.historyArr);
  return (
    <div className="histroyContainer">
        <h1>History</h1>
      {historyArr.length > 0 ? null : <p>No histroy Data found</p>}
      <div className="myScroll wrapper">
        {historyArr.map((historyData) => (
            <div className={"wrapperItem "+historyData.status}>
            <h3>{historyData.name}</h3>
            <div className="wrapperRight">
              <div className="rates">
                <p className="coins">{historyData.coins}</p>
                <p className="price">{historyData.price}</p>
              </div>
              <p className="date">{historyData.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
