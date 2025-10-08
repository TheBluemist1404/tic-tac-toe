import getWinner from "./get-winner";

type Cell = null | "X" | "O";

// Minimax algorithm to get score for each state of the game, depends on "isMaximize"
// The idea is to maximize score for X and minimize score for "O"
// If after the move is "O" turn, whose boards score would be all "minimums"
// So at this state "X" choose the move make it maximum of those "minimums"
// Equivalently, put "O" into its worst position
// Same idea when "O" want to make a move, try to get the minimum of the "maximums"

function minimax(board: Cell[], depth: number, isMaximize: boolean, alpha: number, beta: number): number {
  const winnerProps = getWinner(board);
  const winner = winnerProps?.winner
  if (winner) {
    if (winner === "X") return (10-depth);  // X win early means better score
    if (winner === "O") return -(10-depth); // O wins early means worse score
    return 0;
  }

  if (isMaximize) { // "X" is making move here
    let maxScore = -Infinity;
    for (let i = 0; i< 9; i++) {
      if (board[i]) continue;
      let newBoard = [...board];
      newBoard[i] = "X";
      const score = minimax(newBoard, depth + 1, !isMaximize, alpha, beta); // true -> false, next turn is "O"
      maxScore = Math.max(maxScore, score);
      alpha = Math.max(maxScore, alpha); // This says "X can get min score of alpha"
      if (beta <= alpha) break;// This branch could not get any greater than alpha, so why dig deeper? Lets move to next branch
    }
    return maxScore;
  } else { // "O" is making move here
    let minScore = Infinity;
    for (let i = 0; i< 9; i++) {
      if (board[i]) continue;
      let newBoard = [...board];
      newBoard[i] = "O";
      const score = minimax(newBoard, depth + 1, !isMaximize, alpha, beta); // false -> true, next turn is "X"
      minScore = Math.min(minScore, score);
      beta = Math.min(minScore, beta); // This says "O can get max score of beta"
      if (alpha >= beta) break; // This branch could not get any less than beta, so why dig deeper? Lets move to next branch
    }
    return minScore;
  }
}

export default function getBestMove(board: Cell[], depth:number, isMaximize: boolean):number | null {
  let bestMove: number = 0;
  let bestScore: number

  const winner = getWinner(board);
  if (winner) {
    return null;
  }

  if (isMaximize) {
    bestScore = -Infinity;
    for (let i = 0; i<9; i++) {
      if (board[i]) continue;
      let newBoard = [...board];
      newBoard[i] = "X";
      const evalScore = minimax(newBoard, depth + 1, !isMaximize, -Infinity, Infinity);
      if (evalScore > bestScore) {
        bestScore = evalScore;
        bestMove = i;
      }
    }
    console.log(bestScore, bestMove);
    return bestMove;
  } else {
    bestScore = Infinity;
    for (let i = 0; i<9; i++) {
      if (board[i]) continue;
      let newBoard = [...board];
      newBoard[i] = "O";
      const evalScore = minimax(newBoard, depth + 1, !isMaximize, -Infinity, Infinity);
      if (evalScore < bestScore) {
        bestScore = evalScore;
        bestMove = i;
      }
    }
    console.log(bestScore, bestMove);
    return bestMove;
  }
}