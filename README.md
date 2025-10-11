# Tic Tac Toe with React + TypeScript
We implement a simple Tic Tac Toe game with React + TypeScript, providing simple gameplay features and minimal UI (though maybe quite too minimal).  

Deployed at https://tic-tac-toe-beta-ecru.vercel.app/

## How to start this repo
Clone the repo
```
git clone https://github.com/TheBluemist1404/tic-tac-toe.git
cd tic-tac-toe
code .
```
(Of course clone anyway you want, the above is just one of the basic ways)

Now that you have cloned the repo, simply run these lines in terminal
```
npm install
npm run dev
```

## How to play
Well, it is no more than an ordinary tic tac toe, plus a 3D look (took some time to design but it is fun)

You may choose to play with a friend, or take your time competing with Computer, by toggle the `Mode` button
Currently there are 2 levels: **Easy** and **Hard**. If you want something to chill out, try **Easy**, and for more challenge play in **Hard** mode

Game over but fancy another one? Click the `Replay` button to start a new game.

Here is a short [demo gameplay](https://youtu.be/LsoZ49CGSMc)

## Features
### Clear gameplay status
You can always see whose turn it is (not quite "available" if you are competing computer since, well, it is always your turn as the computer makes move quite fast). The turn also change the background color so it should be visibly recognisable.

Also when the game ends, the winner would be depicted (or Draw) alongside with the winning combinations (if one exist). Until you click `Replay`, you may not make anymore move when the game is over.

And, of course, make move on the empty cell only (I might not have to explain).


### Multiple game modes
We demonstrate 2 modes: `2 players` mode and `Computer` mode. 

Additonally, the gameplay with Computer may categorised into 2 levels: `Easy` and `Hard`
- Easy Mode: Computer would make random valid move, so it is (should be) easy to win most of the time.
- Hard Mode: Implement with ***minimax + A/B pruning***, so should be unbeatable.
```js
// Minimax algorithm to get score for each state of the game, depends on "isMaximize"
// The idea is to maximize score for X and minimize score for "O"
// If after the move is "O" turn, whose boards score would be all "minimums"
// So at this state "X" choose the move make it maximum of those "minimums"
// Equivalently, put "O" into its worst position
// Same idea when "O" want to make a move, try to get the minimum of the "maximums"

function minimax(board: CellType[], depth: number, isMaximize: boolean, alpha: number, beta: number, setNode: React.Dispatch<React.SetStateAction<number>>): number {
  setNode(prev => prev + 1);
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
      const score = minimax(newBoard, depth + 1, !isMaximize, alpha, beta, setNode); // true -> false, next turn is "O"
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
      const score = minimax(newBoard, depth + 1, !isMaximize, alpha, beta, setNode); // false -> true, next turn is "X"
      minScore = Math.min(minScore, score);
      beta = Math.min(minScore, beta); // This says "O can get max score of beta"
      if (alpha >= beta) break; // This branch could not get any less than beta, so why dig deeper? Lets move to next branch
    }
    return minScore;
  }
}
```


### Stats display
We also demonstate gameplay statistics (specifically for player X only). We track wins, losses, draws and win streak as well (persistent storage with `localStorage`). Moreover, to make it more interactive, win streak is also display with a progress bar, and special effect would take place when you reach streak of at least 5.


### Metrics for Hard mode
To better depict how **minimax algorithm** actually work behind the scene, we also provide the metrics (*nodes evaluated* and *thinking time*)
- Implementation of **nodes evaulation**: We pass a `setNode` from root (`App.tsx` -> `Board.tsx` -> `minimax.ts`) so for each of the node (equivalent to each call to `function minimax`) we increment the number of nodes;
- Implementation of **thinking time**: Simple wrap `getBestMove` in `performance.now()` to get `start` and `end` then `setCalculateTime(end-start)` (the setter passed down from `App.tsx` -> `Board.tsx`)
The code looks like this
```js
setNode(_ => 0); // Reset node for re-evaluation
const start = performance.now()
const bestMove = getBestMove(newBoard, depth + 1, false, setNode);
const end = performance.now();
setCalculateTime((end-start));
```
