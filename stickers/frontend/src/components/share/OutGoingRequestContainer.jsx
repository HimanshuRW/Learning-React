import OutGoingRequestList from "../../miniComponents/share/OutGoingRequestList.jsx";
import SearchUser from "../../miniComponents/share/SearchUser.jsx";
import Msg from "../../miniComponents/share/Msg.jsx";
import UpperPart from '../../miniComponents/share/UpperPart.jsx';
import { useSelector } from "react-redux";
import AskUser from "../../miniComponents/share/AskUser.jsx";

export default function OutGoingRequestContainer({ styles }) {
  console.log("OutGoingRequestContainer");
  return (
    <div className={styles.container}>
      <Msg styles={styles} />
      <UpperPart styles={styles} />

      {/* Sent  */}
      <Container madeFor="sent" styles={styles}>
        <OutGoingRequestList
          styles={styles}
        />
      </Container>

      {/* Search */}
      <Container madeFor="search" styles={styles}>
        <SearchUser />
      </Container>

      {/* Ask */}
      <Container madeFor="ask" styles={styles}>
        <AskUser />
      </Container>
       
    </div>
  );
}

function Container({madeFor,children,styles}) {
  const comp = useSelector((state) => state.askCoins.comp);
  console.log("comp ab : ",comp);
  let hide;
  if(madeFor=="sent") hide = styles.hide_left;
  if(madeFor=="search") hide = styles.hide_right;
  if(madeFor=="ask") hide = styles.hide_right;
  return(
    <div
        className={
          styles.containerData +
          " " +
          styles.slide +
          " " +
          (comp==madeFor ? styles.show : hide)
        }
      >
        {children}
      </div>
  )
}