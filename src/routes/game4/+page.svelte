<script lang="ts">
  import { onMount } from "svelte";

  const randomWikipediaArticle = async () => {
    const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary");
    return await response.json();
  };

  let article: any = {};
  let correctLetters: string[] = [];
  let letterIndex = 0;
  let typedLetters: { letter: string; correct: null | true | false }[] = [];

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.key === "Backspace") {
      typedLetters.pop();
      letterIndex = Math.max(0, letterIndex - 1);
      typedLetters = [...typedLetters];
    }

    if (event.key === "Enter") updateArticle();

    if (event.key.length === 1) {
      if (event.key === correctLetters[letterIndex]) {
        typedLetters.push({ letter: event.key, correct: true });
      } else {
        typedLetters.push({ letter: event.key, correct: false });
      }

      letterIndex = Math.min(correctLetters.length, letterIndex + 1);
      event.preventDefault();
      typedLetters = [...typedLetters];
    }
  };

  const updateArticle = async () => {
    article = await randomWikipediaArticle();
    correctLetters = article.extract.split("");
    typedLetters = [];
    letterIndex = 0;
  };

  onMount(async () => {
    await updateArticle();
  });
</script>

<svelte:window on:keydown={onKeyDown} />

<h3>Game 4</h3>

<div class="m-auto max-w-[900px] rounded-xl border border-black bg-gray-600 p-6 font-mono text-2xl">
  <p>
    {#each correctLetters as letter, i}
      {#if typedLetters[i]?.correct}
        <span class="correct">{letter}</span>
      {:else if typedLetters[i]?.correct === false}
        <span class="wrong">{typedLetters[i].letter}</span>
      {:else}
        <span>{letter}</span>
      {/if}
    {/each}
  </p>
</div>

<style>
  .correct {
    color: greenyellow;
  }

  .wrong {
    color: red;
  }
</style>
