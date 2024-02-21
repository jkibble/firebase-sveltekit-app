<script lang="ts">
  import wordList from "$lib/word_list.json";
  import { faker, ro } from "@faker-js/faker";

  const words = faker.helpers.arrayElements(wordList, 20).filter((word) => word.length > 3);
  const letters = words.join("").split("");

  let grid = Array(9)
    .fill("")
    .map(() => Array(9).fill(""));

  let status: { row: number; col: number; letter: string }[] = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const letter = letters.pop();
      grid[i][j] = letter;
    }
  }
  let interval: NodeJS.Timeout;

  // interval = setInterval(() => {
  //   const col = Math.floor(Math.random() * 9);
  //   const row = findEmptyRow(col);
  //   const letter = letters.pop();
  //   counter++;

  //   if (!letter || counter > 81) {
  //     clearInterval(interval);
  //     return;
  //   }

  //   if (row === -1) {
  //     return;
  //   }

  //   grid[row][col] = letter;
  // }, 1000);

  const isMatch = (letter: string) => {
    return status.some((item) => item.letter === letter);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === "Enter") {
      clearInterval(interval);
    }

    let row = 8;

    // find the first instance of the letter in the grid starting from the bottom
    for (let i = 8; i >= 0; i--) {
      const col = grid[i].indexOf(event.key);

      if (col !== -1) {
        row = i;
        status.push({ row, col, letter: event.key });
        status = [...status];
        break;
      }
    }
  };

  const findEmptyRow = (col: number) => {
    let row = 8;

    while (row >= 0) {
      if (grid[row][col] === "") {
        return row;
      }

      row--;
    }

    return -1;
  };
</script>

<h3>Game 6</h3>

<svelte:window on:keydown={onKeyDown} />

<div class="grid grid-cols-9 gap-2 text-2xl">
  {#each grid as row}
    {#each row as letter}
      <div
        class="aspect-square w-16 border border-gray-300 p-3 text-center"
        class:bg-orange-400={isMatch(letter)}
      >
        {letter}
      </div>
    {/each}
  {/each}
</div>
