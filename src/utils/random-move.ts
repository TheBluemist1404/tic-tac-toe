import type { CellType } from "../types/cell";

export default function getRandomValidMove(board: CellType[]): number | null {
  let validMoveArray: number[] = [];
  for (let i = 0; i < 9; i++) {
    if (!board[i]) validMoveArray.push(i);
  }
  if (validMoveArray.length) {
    const randomIndex = Math.floor(Math.random() * validMoveArray.length);
    return validMoveArray[randomIndex];
  }
  return null;
}