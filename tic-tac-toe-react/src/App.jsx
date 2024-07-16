import { useState } from "react";

import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning-combination";
import Log from "./components/Log";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((arr) => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveCurrentPlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const gameBoard = deriveGameBoard(gameTurns);
  const activePlayer = deriveCurrentPlayer(gameTurns);

  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(row, col) {
    setGameTurns((prevState) => {
      const currentPlayer = deriveCurrentPlayer(prevState);

      const updatedTurns = [
        { square: { row, col }, player: currentPlayer },
        ...prevState,
      ];

      return updatedTurns;
    });
  }

  function handleChangeName(symbol, newPlayerName) {
    setPlayers((prevState) => {
      return {
        ...prevState,
        [symbol]: newPlayerName,
      };
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              name={PLAYERS.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handleChangeName}
            />
            <Player
              name={PLAYERS.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handleChangeName}
            />
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
        <Log turns={gameTurns} players={players}/>
      </main>
    </>
  );
}

export default App;
