<script lang="ts">
  import { faker } from "@faker-js/faker";
  import wordList from "$lib/word_list.json";

  const generateWords = (seed: number) => {
    faker.seed(seed);
    const randomWords = faker.helpers.arrayElements(wordList, 2500);
    const possibleWords = randomWords.filter((word) => word.length >= 4);
    const validLetters = extractValidLetters(possibleWords);
    const centerLetter = validLetters[0];

    const validWords = possibleWords.filter((word) =>
      isValidWord(word, centerLetter, [...validLetters, centerLetter]),
    );

    return {
      centerLetter,
      validLetters: validLetters.slice(1),
      validWords,
    };
  };

  const isValidWord = (word: string, centerLetter: string, validLetters: string[]) => {
    return (
      word.includes(centerLetter) &&
      [...word].every((letter) => validLetters.includes(letter)) &&
      word.length > 3
    );
  };

  const extractValidLetters = (wordList: string[]) => {
    const allLetters = wordList.join("").split("");

    const letterCounts = allLetters.reduce((acc: any, letter: string) => {
      acc[letter] = acc[letter] ? acc[letter] + 1 : 1;
      return acc;
    }, {});

    const sortedLetters = Object.entries(letterCounts).sort((a, b) => b[1] - a[1]);
    return sortedLetters.map(([letter]) => letter).slice(0, 7);
  };

  const date = new Date();
  const dateString = date.getFullYear() + "" + date.getMonth() + "" + date.getDate();
  const results = generateWords(parseInt(dateString, 10));

  console.log("Results:", results);

  const addLetter = (letter: string) => {
    guessedWord = [...guessedWord, letter];
  };

  const testWord = () => {
    const word = guessedWord.join("");
    if (results.validWords.includes(word)) {
      guessedWords = [...guessedWords, word];
    }

    guessedWord = [];
  };

  let guessedWord: string[] = [];
  let guessedWords: string[] = [];
</script>

<h3>Game 2</h3>

<div class="pb-3">
  <h4>Guessed Word</h4>
  <div class="h-6 text-2xl">{guessedWord.join("")}</div>
  <div class="flex gap-2">
    {#each guessedWords as word}
      <span>{word}</span>
    {/each}
  </div>
</div>

<div class="flex gap-3 text-3xl">
  <div>
    <button
      on:click={() => addLetter(results.centerLetter)}
      class="letter aspect-square w-16 bg-orange-400 shadow"
    >
      {results.centerLetter}
    </button>
  </div>
  {#each results.validLetters as letter}
    <div>
      <button on:click={() => addLetter(letter)} class="letter aspect-square w-16 shadow">
        {letter}
      </button>
    </div>
  {/each}
  <button on:click={testWord}>Enter</button>
</div>

<style>
  .letter {
    clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
  }
</style>
