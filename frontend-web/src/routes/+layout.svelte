<script>
	import { taskStore } from '$lib/stores/questStore.js';
	import '../app.css';
	let { children, data } = $props();
	taskStore.set({quests: data.quests, dailies: data.dailies, goals: data.goals})
    let tasks = $state({quests: data.quests, dailies: data.dailies, goals: data.goals})
</script>

<main class="m-auto max-w-xl px-1 max-sm:px-4 ">
	{@render children()}
</main>

<style lang="postcss">
	:global(body) {
		@apply bg-zinc-900;
	}
</style>
  