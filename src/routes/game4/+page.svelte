<script lang="ts">
  import { faker } from "@faker-js/faker/locale/en";
  import { onMount } from "svelte";
  import wordList from "$lib/word_list.json";

  let correctLetters: string[] = [];
  let letterIndex = 0;
  let typedLetters: { letter: string; correct: null | true | false; incorrect?: string }[] = [];
  let wordsPerMinute = 0;
  let numberOfWords = 0;
  let errors = 0;
  let timer = 0;
  const commonWords = ["the", "of", "is", "and", "in", "with", "a", "to", "for", "on"];

  const startTimer = () => {
    const startTime = new Date().getTime();
    wordsPerMinute = 0;
    const interval = setInterval(() => {
      timer++;
      const currentTime = new Date().getTime();
      const elapsedTime = (currentTime - startTime) / 1000 / 60;
      wordsPerMinute = Math.round(numberOfWords / elapsedTime);
    }, 1000);
  };

  const onKeyDown = async (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const typedKey = event.key;

    if (typedKey === "Backspace") {
      const removed = typedLetters.pop();
      if (removed?.letter === " ") numberOfWords--;
      if (removed?.correct === false) errors--;
      letterIndex = Math.max(0, letterIndex - 1);
      typedLetters = [...typedLetters];
    }

    if (typedKey === "Enter") {
      typedLetters = [];
      correctLetters = await makeParagraph();
    }

    if (typedKey.length !== 1) return;
    if (typedKey === " " && correctLetters[letterIndex] !== " ") return;

    if (typedKey === " ") {
      numberOfWords++;
    }

    event.preventDefault();

    if (letterIndex === 0) {
      startTimer();
    }

    if (typedKey === correctLetters[letterIndex]) {
      typedLetters.push({ letter: typedKey, correct: true });
    } else {
      typedLetters.push({
        letter: typedKey,
        correct: false,
      });
      errors++;
    }

    letterIndex = Math.min(correctLetters.length, letterIndex + 1);
    typedLetters = [...typedLetters];
  };

  const makeParagraph = async () => {
    const words = faker.helpers.arrayElements(wordList, 500);
    const sentenceCount = faker.number.int({ min: 4, max: 6 }); // Random sentence count (between 4 and 6)
    let paragraph = "";
    letterIndex = 0;
    wordsPerMinute = 0;
    numberOfWords = 0;
    errors = 0;

    for (let i = 0; i < sentenceCount; i++) {
      const sentenceLength = faker.number.int({ min: 5, max: 10 }); // Random sentence length (between 5 and 10 words)
      let sentence = "";

      for (let j = 0; j < sentenceLength; j++) {
        if (Math.random() < 0.2 && j < sentenceLength - 1) {
          const randomCommonIndex = faker.number.int({ min: 0, max: commonWords.length });
          sentence += " " + commonWords[randomCommonIndex];
        } else {
          const randomIndex = faker.number.int({ min: 0, max: words.length });
          sentence += " " + words[randomIndex];
        }
      }

      // Capitalize the first word of the sentence
      sentence = sentence.trim();
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);

      paragraph += sentence + ". ";
    }

    return paragraph.split("");
  };

  onMount(async () => {
    correctLetters = await makeParagraph();
  });
</script>

<svelte:window on:keydown={onKeyDown} />

<h3>Game 4</h3>

<div class="flex-colr flex justify-between p-5">
  <span>WPM: {wordsPerMinute}</span>
  <span>Number of Words: {numberOfWords}</span>
  <span>Errors: {errors}</span>
  <span>Timer: {Math.floor(timer / 60)}:{timer % 60}</span>
</div>

<div class="m-auto whitespace-pre-wrap rounded-xl border p-5 text-2xl text-gray-600">
  <p class="font-mono leading-loose">
    {#each correctLetters as letter, i}
      {#if typedLetters[i]?.correct}
        <span class="text-white">{letter}</span>
      {:else if typedLetters[i]?.correct === false}
        <span class="text-red-500">{typedLetters[i].letter}</span>
      {:else}
        <span>{letter}</span>
      {/if}
    {/each}
  </p>
</div>
