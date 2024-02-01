<script lang="ts">
  import "../global.css";
  import LeftMenu from "$lib/components/left_menu.svelte";

  import { auth } from "$lib/firebase";
</script>

<div class="grid gap-8 bg-[#1f2937] text-white">
  <LeftMenu />
  <div id="main-content" class="pt-8">
    <slot />
  </div>
</div>

<style>
  .grid {
    grid-template-columns: 15rem 1fr;
  }

  #main-content {
    view-transition-name: fade;
  }
</style>
