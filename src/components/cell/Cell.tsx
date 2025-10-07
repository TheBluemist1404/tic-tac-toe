import './Cell.css'

type Cell = null | "X" | "O";
type CellProps = {
  cell: Cell;
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

export default function Cell({cell}: CellProps) {
  function renderCell(cell: Cell) {
    if (!cell) return;
    if (cell === "X") return < XCell />;
    if (cell === "O") return < OCell />;
  }
  return <div className="cell">
    {renderCell(cell)}
  </div>
}

