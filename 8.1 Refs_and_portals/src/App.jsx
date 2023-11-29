import TimerChallenge from './components/CHallenge.jsx';
import Player from './components/Player.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title="Easy" targetTime={1} />
        <TimerChallenge title="Not Easy" targetTime={5} />
        <TimerChallenge title="Getting Enough" targetTime={10} />
        <TimerChallenge title="Himanshu only" targetTime={15} />
      </div>
    </>
  );
}

export default App;
