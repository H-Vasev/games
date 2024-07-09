import { useState } from "react";
import GameBoard from "./components/GameBoard";

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

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const gameBoard = deriveGameBoard(gameTurns);

  function handleSelectSquare(row, col) {
    setGameTurns((prevState) => {
      const updatedTurns = [
        { square: { row, col }, player: "X" },
        ...prevState,
      ];

      return updatedTurns;
    });
  }

  return (
    <>
    <main>
      <div id="game-container">
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
    </main>
    </>
  );
}

export default App;
