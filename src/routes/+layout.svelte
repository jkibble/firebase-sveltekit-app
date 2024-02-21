<script lang="ts">
  import "../global.css";
  import Menu from "$lib/components/menu.svelte";
</script>

<main class="mx-auto grid gap-3 sm:max-w-[95vw] md:max-w-[85vw]">
  <Menu />
  <section class="mx-auto">
    <slot />
  </section>
</main>
