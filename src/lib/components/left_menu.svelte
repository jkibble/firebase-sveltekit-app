<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import { page } from "$app/stores";

  const routes = [
    {
      id: "/",
      name: "Home",
    },
    {
      id: "/about",
      name: "About",
    },
    {
      id: "/projects",
      name: "Projects",
    },
    {
      id: "/calendar",
      name: "Calendar",
    },
    {
      id: "/documents",
      name: "Documents",
    },
    {
      id: "/reports",
      name: "Reports",
    },
  ];

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

<nav class=" bg-slate-400 h-[100svh]" aria-label="Sidebar">
  <ul role="list" class="grid gap-2 pt-4 text-lg font-bold text-white">
    {#each routes as route, index}
      <li
        class:active={currentRoute === route.id}
        class="after:bg-slate-400 before:bg-slate-400 ml-4
        rounded-[100vw_0_0_100vw] relative"
      >
        <a href={route.id}>{route.name}</a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  li.active {
    view-transition-name: slide;
  }

  li.active::before,
  li.active::after {
    --border-radius: 1.5rem;

    content: "";
    position: absolute;
    width: var(--border-radius);
    height: var(--border-radius);
    right: 0;
  }

  li.active::before {
    top: calc(var(--border-radius) * -1);
    box-shadow: 5px 5px 0 5px #1f2937;
    border-radius: 0 0 100vw 0;
  }

  li.active::after {
    bottom: calc(var(--border-radius) * -1);
    box-shadow: 5px -5px 0 5px #1f2937;
    border-radius: 0 100vw 0 0;
  }

  a {
    padding: 1rem 2rem;
    display: block;
  }

  li.active {
    background-color: #1f2937;
  }
</style>
