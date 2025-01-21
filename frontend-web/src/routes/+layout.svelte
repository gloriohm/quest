<script>
	import '../app.css';
	let { children } = $props();
</script>

<main class="m-auto max-w-xl px-1 max-sm:px-4">
	{@render children()}
</main>
