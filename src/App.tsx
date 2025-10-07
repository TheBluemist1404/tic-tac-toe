import './App.css'
import Board from './components/board/Board'
import { useState } from 'react';

function App() {
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  return (
    <div className='container' style={{background: isXTurn ? "#F28B82": "#A7C7E7"}}>
      <Board isXTurn={isXTurn} setIsXTurn={setIsXTurn}  />
    </div>
  )
}

export default App
