import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

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

function App() {
  const [players, setPlayers] = useState("Player");
  const [gameTurns, setGameTurns] = useState([]);

  const gameBoard = deriveGameBoard(gameTurns);
  const activePlayer = deriveCurrentPlayer(gameTurns);

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

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              name={"player"}
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handleChangeName}
            />
            <Player
              name={"player"}
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handleChangeName}
            />
          </ol>
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
      </main>
    </>
  );
}

export default App;
