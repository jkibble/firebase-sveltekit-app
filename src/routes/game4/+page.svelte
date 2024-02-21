<script lang="ts">
  import { enhance } from "$app/forms";

  export let data;
  export let form;

  console.log(form);

  let letters: { letter: string; correct: null | false | true }[] = data.paragraph
    .join("")
    .split("")
    .map((letter) => ({ letter, correct: null }));

  let wordsPerMinute = 0;
  let numberOfWords = 0;
  let letterIndex = 0;
  let errors = 0;
  let timer = 0;

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

  const updateLetters = (e: Event) => {
    const key = e.data;

    if (key === " ") {
      numberOfWords++;
    }

    if (key === null) {
      letterIndex--;

      if (letters[letterIndex].correct === false) {
        errors--;
      }

      letters[letterIndex].correct = null;
    }

    if (!key || key.length !== 1) {
      return false;
    }

    if (key === letters[letterIndex].letter) {
      letters[letterIndex].correct = true;
    } else {
      letters[letterIndex].correct = false;
      errors++;
    }

    letterIndex++;

    return false;
  };
</script>

<!-- <svelte:window on:keydown={onKeyDown} /> -->

<h3>Game 4</h3>

<div class="flex-colr flex justify-between p-5">
  <span>WPM: {wordsPerMinute}</span>
  <span>Number of Words: {numberOfWords}</span>
  <span>Errors: {errors}</span>
  <span>Timer: {Math.floor(timer / 60)}:{timer % 60}</span>
</div>

<div
  class="relative whitespace-pre-wrap rounded-xl border bg-slate-700 p-5 text-2xl text-gray-500 blur-sm focus-within:blur-0"
>
  <form method="POST" class="font-mono leading-loose" use:enhance>
    <input type="text" class="absolute inset-0 opacity-0" on:input={(e) => updateLetters(e)} />
    {#each letters as letter, i}
      {#if letter.correct}
        <span class="text-white">{letter.letter}</span>
      {:else if letter.correct === false}
        <span class="text-red-500">{letter.letter}</span>
      {:else}
        <span>{letter.letter}</span>
      {/if}
    {/each}
  </form>
</div>
