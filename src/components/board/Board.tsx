import { useState } from "react";
import Cell from "../cell/Cell";
import "./Board.css";
import getWinner from "../../utils/get-winner";
import getBestMove from "../../utils/minimax";

type Cell = null | "X" | "O";

type BoardProps = {
  isXTurn: boolean;
  setIsXTurn: React.Dispatch<React.SetStateAction<boolean>>;
  playBot: boolean;
  winner: Cell | "N/A";
  setWinner: React.Dispatch<React.SetStateAction<Cell | "N/A">>;
};
export default function Board({
  isXTurn,
  setIsXTurn,
  playBot,
  winner,
  setWinner,
}: BoardProps) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [depth, setDepth] = useState<number>(0);
  const [winComb, setWinComb] = useState<number[] | undefined>(undefined);

  async function handleClick(i: number) {
    if (!winner && !board[i]) {
      let newBoard = [...board];
      if (!playBot) {
        if (isXTurn) {
          newBoard[i] = "X";
        } else {
          newBoard[i] = "O";
        }
        setBoard(newBoard);

        const winnerProps = getWinner(newBoard);
        const winnerFound = winnerProps?.winner;
        if (winnerFound) {
          setWinner(winnerFound);
          if (winnerFound !== "N/A") {
            setWinComb(winnerProps.combination);
            console.log("the winner is ", winnerFound);
          } else {
            console.log("Game Draw");
          }
        } else {
          setIsXTurn(!isXTurn);
          setDepth((prev) => prev + 1);
        }
      } else {
        newBoard[i] = isXTurn ? "X" : "O";

        setBoard(newBoard);

        const winnerProps = getWinner(newBoard);
        const winnerFound = winnerProps?.winner;
        if (winnerFound) {
          setWinner(winnerFound);
          if (winnerFound !== "N/A") {
            setWinComb(winnerProps.combination);
            console.log("the winner is ", winnerFound);
          } else {
            console.log("Game Draw");
          }
        } else {
          // console.log(newBoard, depth);
          setIsXTurn(false);
          const bestMove = await getBestMove(newBoard, depth + 1, false);
          if (bestMove !== null) {
            newBoard[bestMove] = isXTurn ? "O" : "X";
          }
          const winnerProps = getWinner(newBoard);
          const winnerFound = winnerProps?.winner;
          if (winnerFound) {
            if (winnerFound !== "N/A") {
              setWinComb(winnerProps.combination);
              console.log("the winner is ", winnerFound);
              setWinner(winnerFound);
            } else {
              console.log("Game Draw");
            }
          } else {
            setIsXTurn(true);
            setDepth((prev) => prev + 2);
          }
        }
      }
    }
  }

  function replay() {
    setBoard(Array(9).fill(null));
    setDepth(0);
    setIsXTurn(true);
    setWinner(null);
    setWinComb(undefined);
  }

  function renderCell() {
    console.log(winComb)
    return board.map((cell, i) => (
      <Cell id={i} cell={cell} inWinComb={winComb ? winComb.includes(i): false} />
    ));
  }

  return (
    <div className="board">
      <div className="board-content">
        {renderCell()}
      </div>
      <div className="vertical-divider">
        <div style={{ width: "10px", height: "100%", background: "#000" }} />
        <div style={{ width: "10px", height: "100%", background: "#000" }} />
        <div style={{ width: "10px", height: "100%", background: "#000" }} />
        <div style={{ width: "10px", height: "100%", background: "#000" }} />
      </div>
      <div className="horizontal-divider">
        <div style={{ height: "10px", width: "100%", background: "#000" }} />
        <div style={{ height: "10px", width: "100%", background: "#000" }} />
        <div style={{ height: "10px", width: "100%", background: "#000" }} />
        <div style={{ height: "10px", width: "100%", background: "#000" }} />
      </div>
      <div className="click-handler">
        {[...Array(9)].map((_, i) => (
          <div onClick={() => handleClick(i)}></div>
        ))}
      </div>
      {winner && (
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            width: "500px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={replay}>Replay?</button>
        </div>
      )}
    </div>
  );
}
