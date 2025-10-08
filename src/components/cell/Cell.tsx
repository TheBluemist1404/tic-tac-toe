import './Cell.css'
import type { CellType } from '../../types/cell';

type CellProps = {
  id: number
  cell: CellType;
  inWinComb: boolean
}

function XCell() {
  return <div style={{width: "100%", height: "100%"}}>
    <div className='x-cell'>
      <div className='cross1 shadow'></div>
      <div className='cross2 shadow'></div>
    </div>
    <div className='x-cell' style={{translate: "10px 10px"}}>
      <div className='cross1'></div>
      <div className='cross2'></div>
    </div>
  </div>
}

function OCell() {
  return <div className='o-cell' style={{translate: "15px 15px"}}/>
}

export default function Cell({id, cell, inWinComb}: CellProps) {
  function renderCell(cell: CellType) {
    if (!cell) return;
    if (cell === "X") return < XCell />;
    if (cell === "O") return < OCell />;
  }
  return <div id={id.toString()} className="cell" style={{backgroundColor: `${inWinComb ? "#bff887ff": "#F7F7F7"}`}}>
    {renderCell(cell)}
  </div>
}

