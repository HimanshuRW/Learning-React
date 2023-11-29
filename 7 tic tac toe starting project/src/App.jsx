import Player from "./components/Player.jsx";
import Game_Board from "./components/Game_Board.jsx";
import Log from "./components/Log.jsx";
import { useState } from "react";

const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const log_arr = [];
let currentPlayer = 1;

function check_win() {
  for (let i = 0; i < 3; i++) {
    if ((board[i][0] != null) && (board[i][0] == board[i][1]) && (board[i][1]== board[i][2]))
      return board[i][0];
      if ((board[0][i] != null) && (board[0][i] == board[1][i]) && (board[1][i]== board[2][i]))
      return board[0][i];
  }
  if (board[1][1] != null) {
    if ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2])) return board[1][1];
    if ((board[0][2] == board[1][1]) && (board[1][1] == board[2][0])) return board[1][1];
  }
  return 0;
}

function App() {
  const [current_log_arr, set_log_arr] = useState(log_arr);

  function chnage_in_boxes(row, col) {
    if (currentPlayer == 1) {
      board[row][col] = "X";
      currentPlayer = 2;
    } else {
      board[row][col] = "O";
      currentPlayer = 1;
    }

    if(check_win()=='X') console.log("player 1 won");;
    if(check_win()=='O') console.log("player 2 won");;

    let new_log_arr = [
      ...current_log_arr,
      { player: currentPlayer, row: row, col: col },
    ];
    set_log_arr(new_log_arr);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            playerName="Player 1"
            symbol="X"
            isActive={currentPlayer == 1 ? true : false}
          />
          <Player
            playerName="Player 2"
            symbol="O"
            isActive={currentPlayer == 2 ? true : false}
          />
        </ol>
        <Game_Board game_board={board} update={chnage_in_boxes} />
      </div>
      <Log log_arr={current_log_arr} />
    </main>
  );
}

export default App;
