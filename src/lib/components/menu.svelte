<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { routes } from "$lib/routes";

  onNavigate(() => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(() => {
        resolve();
      });
    });
  });

  $: currentRoute = $page.route.id;
</script>

<nav class="rounded bg-indigo-700/75 p-4 text-white">
  <ul class="flex">
    {#each routes as route}
      <li>
        <a class="p-4" href={route.path} class:bg-indigo-700={currentRoute === route.path}>
          {route.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>
