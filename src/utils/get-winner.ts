type Cell = null | "X" | "O";

const winSet = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

type WinnerProps = {
  winner: Cell | "N/A"
  combination?: number[]
}

export default function getWinner(board: Cell[]): WinnerProps | null {
  for (const [a,b,c] of winSet) {
    if (board[a] && (board[a] === board[b]) && (board[a] === board[c])) {
      return {winner: board[a], combination: [a,b,c]};
    }
  }

  let full = true;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      full = false;
      break;
    }
  }
  if (full) return {winner: "N/A"};
  return null
}