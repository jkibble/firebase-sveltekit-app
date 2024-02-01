<script lang="ts">
  import { faker } from "@faker-js/faker";
  import wordList from "$lib/word_list.json";

  let board = Array(6).fill(Array(5).fill({ letter: "", match: 0 }));
  let rowIndex = 0;
  let letterIndex = 0;
  let letters: { letter: string; match: number }[] = [];
  let flipped: boolean[] = [];
  let notAWord: number | null = null;
  let possibleWords: string[] = [];

  const getWordOfTheDay = () => {
    const date = new Date();
    const dateString = date.getFullYear() + "" + date.getMonth() + "" + date.getDate();
    faker.seed(parseInt(dateString, 10));

    possibleWords = wordList.filter((word) => word.length === 5);
    const word = faker.helpers.arrayElement(possibleWords);

    console.log("Word of the day:", word);
    return word;
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    let row = board[rowIndex];
    notAWord = null;

    if (event.key === "Backspace") {
      letters = letters.slice(0, -1);
      updateBoard(letters, rowIndex);
    }

    if (event.key === "Enter") {
      if (!checkValidWord(letters)) {
        notAWord = rowIndex;
        return;
      }

      board[rowIndex] = row;
      letters = [];
      flipped.push(true);
      rowIndex++;
      letterIndex = 0;

      flipped = [...flipped];
    }

    if (event.key.match(/^[a-z]$/i) && letters.length < 5) {
      const letter = event.key.toLowerCase();
      let match = 0;

      if (letter === wordOfTheDay[letterIndex]) {
        match = 1;
      } else if (wordOfTheDay.includes(letter)) {
        match = 2;
      }

      letters.push({ letter, match });
      updateBoard(letters, rowIndex);
      letterIndex++;
    }
  };

  const checkValidWord = (letters: { letter: string; match: number }[]) => {
    const word = letters.map((letter) => letter.letter).join("");

    return possibleWords.includes(word);
  };

  const updateBoard = (letters: { letter: string; match: number }[], index: number) => {
    let row = board[index];

    row = [...letters, ...Array(5 - letters.length).fill({ letter: "", match: 0 })];
    board[index] = row;
  };

  const wordOfTheDay: string = getWordOfTheDay();
</script>

<svelte:window on:keydown={onKeyDown} />

<h3>Game 3</h3>

<div class="card-container grid gap-3 text-5xl uppercase">
  {#each board as row, i}
    <div class="flex gap-3" class:shake={notAWord === i}>
      {#each row as letter, j}
        <div class="card h-28 w-28" class:flip={flipped[i]}>
          <div class="front card-face h-full w-full rounded-md bg-gray-500">
            {letter.letter}
          </div>
          <div
            class="back card-face h-full w-full rounded-md"
            class:bg-green-700={letter.match === 1}
            class:bg-yellow-700={letter.match === 2}
          >
            {letter.letter}
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .back {
    transform: rotateX(180deg);
  }

  .card-face {
    position: absolute;
    border: 2px solid black;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-container {
    perspective: 1000px;
  }

  .card.flip {
    transform: rotateX(180deg);
  }

  .card {
    transform-style: preserve-3d;
    transition: transform 1s;
    transform-origin: center;
  }

  .card:nth-child(1) {
    transition-delay: 250ms;
  }
  .card:nth-child(2) {
    transition-delay: 500ms;
  }
  .card:nth-child(3) {
    transition-delay: 750ms;
  }
  .card:nth-child(4) {
    transition-delay: 1000ms;
  }
  .card:nth-child(5) {
    transition-delay: 1250ms;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25%,
    75% {
      transform: translateX(-10px);
    }
    50% {
      transform: translateX(10px);
    }
  }

  .shake {
    animation: shake 0.5s ease-in-out;
  }
</style>
