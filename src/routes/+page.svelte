<script lang="ts">
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let nextMove = "X";
  let winner: 1 | 0 | -1 | null = null;
  let whosTurn: "player" | "computer" = "player";

  setInterval(() => {
    if (whosTurn === "computer") {
      handleAIMove();
    }
  }, 1000);

  const handlePlayerMove = (rowIndex: number, cellIndex: number) => {
    if (winner || whosTurn === "computer") return;

    if (board[rowIndex][cellIndex] === "") {
      board[rowIndex][cellIndex] = nextMove;
      nextMove = nextMove === "X" ? "O" : "X";
    }

    board = [...board];
    winner = checkWinner(board);
    whosTurn = "computer";
  };

  // return 1 if O wins, -1 if X wins, 0 if it's a draw, and null if there's no winner yet
  const checkWinner = (board: string[][]) => {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
        return board[i][0] === "O" ? 1 : -1;
      }

      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
        return board[0][i] === "O" ? 1 : -1;
      }
    }

    // Check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
      return board[0][0] === "O" ? 1 : -1;
    }

    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
      return board[0][2] === "O" ? 1 : -1;
    }

    // Check for a draw
    if (!board.flat().includes("")) {
      return 0; // It's a draw
    }

    // No winner yet
    return null;
  };

  const minimax = (board: string[][], depth: number) => {
    let bestScore = -Infinity;
    let newBoard = board;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (newBoard[i][j] === "") {
          newBoard[i][j] = nextMove;
          let score = minimax(newBoard, depth + 1);
          bestScore = Math.max(score, bestScore);
        }
      }
    }

    return bestScore;
  };

  const getBestMove = (board: string[][]) => {
    let bestScore = -Infinity;
    let bestMove = [0, 0];
    let newBoard = board;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (newBoard[i][j] === "") {
          newBoard[i][j] = nextMove;
          let score = minimax(newBoard, 0);
          console.log("score", score);

          if (score > bestScore) {
            bestScore = score;
            bestMove = [i, j];
          }
        }
      }
    }

    return bestMove;
  };

  const newGame = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    nextMove = Math.random() > 0.5 ? "X" : "O";
    whosTurn = Math.random() > 0.5 ? "player" : "computer";
    winner = null;
  };

  const handleAIMove = () => {
    const bestMove = getBestMove(board);
    console.log(bestMove);
    nextMove = nextMove === "X" ? "O" : "X";
    whosTurn = "player";

    // board[bestMove[0]][bestMove[1]] = nextMove;
  };
</script>

<h3>Tic Tac Toe (currently broken)</h3>

<section class="flex flex-col gap-8">
  <h4>Who's Turn: {whosTurn}</h4>

  <div class="grid grid-cols-3 gap-4 text-[4rem]">
    {#each board as row, i}
      {#each row as cell, j}
        <button
          on:click={() => handlePlayerMove(i, j)}
          class="h-28 w-28 rounded border-none bg-orange-500 shadow shadow-black delay-75"
          class:hover:bg-indigo-500={cell === ""}
        >
          {cell}
        </button>
      {/each}
    {/each}
  </div>

  {#if winner !== null}
    {#if winner === 1}
      <h3>Winner: O</h3>
    {:else if winner === -1}
      <h3>Winner: X</h3>
    {:else if winner === 0}
      <h3>It's a draw!</h3>
    {/if}
    <button on:click={newGame}>Play Again</button>
  {/if}
</section>
