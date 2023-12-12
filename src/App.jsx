import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { Turns } from "./constants.js";
import { checkWinnerFrom, checkendGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";

function App() {
  const [board, setBoard] = useState(() => {
    //recuperar el tablero de localStorage
    const savedBoard = window.localStorage.getItem("board");
    return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    //recuperar el turno de localStorage
    const savedTurn = window.localStorage.getItem("turn");
    return savedTurn ? JSON.parse(savedTurn) : Turns.X;
  });

  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    //si ya hay un valor en el tablero o si ya hay un ganador, no hacer nada
    if (board[index] || winner) return;

    //actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //cambiar de turno
    const newTurn = turn === Turns.X ? Turns.O : Turns.X;
    setTurn(newTurn);

    //guardar aquí la partida
    localStorage.setItem("board", JSON.stringify(newBoard));

    //guardar aquí el turno
    localStorage.setItem("turn", JSON.stringify(newTurn));

    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkendGame(newBoard)) {
      setWinner(false); //empate
    }
  };

  //reiniciar el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(Turns.X);
    setWinner(null);

    //borrar el tablero de localStorage
    localStorage.removeItem("board");

    //borrar el turno de localStorage
    localStorage.removeItem("turn");
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === Turns.X}> {Turns.X} </Square>
        <Square isSelected={turn === Turns.O}> {Turns.O} </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
