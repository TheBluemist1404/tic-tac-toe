import { useState } from "react";
import Cell from "../cell/Cell";
import "./Board.css";
import getWinner from "../../utils/get-winner";

type Cell = null | "X" | "O";

type BoardProps = {
  isXTurn: boolean;
  setIsXTurn: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Board({isXTurn,setIsXTurn}: BoardProps) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null)); //
  // const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<Cell>(null);

  function handleClick(i: number) {
    if (!winner && !board[i]) {
      let newBoard = [...board];
      if (isXTurn) {
        newBoard[i] = "X";
      } else {
        newBoard[i] = "O";
      }
      setBoard(newBoard);
      

      const winnerFound = getWinner(newBoard);
      if (winnerFound) {
        if (winnerFound !== "N/A") {
          console.log("the winner is ", winnerFound);
          setWinner(winnerFound);
        } else {
          console.log("Game Draw")
        }
      } else {
        setIsXTurn(!isXTurn);
      }
    }
  }

  return (
    <div className="board">
      <div className="board-content">
        {board.map((cell, _) => (
          <Cell cell={cell} />
        ))}
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
    </div>
  );
}
