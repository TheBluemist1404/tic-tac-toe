import './App.css'
import Board from './components/board/Board'
import { useEffect, useState } from 'react';

type Cell = null | "X" | "O";

function App() {
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<Cell | "N/A">(null);
  const [playBot, setPlayBot] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<string>("X Turn");

  useEffect(()=> {
    if (winner) {
      if (winner === "N/A") {
        setGameStatus("Draw")
      } else {
        setGameStatus(`${winner} wins`)
      }
    } else {
      setGameStatus(`${isXTurn ? "X": "O"} Turn`)
    }
  })

  return (
    <div className='container' style={{background: isXTurn ? "#F28B82": "#A7C7E7"}}>
      <div className='game-status'>
        <button onClick={()=>setPlayBot(!playBot)}>Mode: {playBot ? "Computer": "2 playes"}</button>
        <div style={{flex: 1, textAlign: "center", fontSize: "24px", fontWeight: "bold"}}>{gameStatus}</div>
      </div>
      <Board isXTurn={isXTurn} setIsXTurn={setIsXTurn} playBot={playBot} winner={winner} setWinner={setWinner} />
    </div>
  )
}

export default App
