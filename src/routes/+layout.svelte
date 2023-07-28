<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import '../icons-bundle.ts';
	import { colorTheme } from '../stores';

	onMount(() => {
		colorTheme.set(localStorage.theme || 'default');
	});
</script>

<slot />

<style lang="postcss">
	:root {
		background-color: theme(colors.stone.900);
		color: theme(colors.zinc.100);
	}
</style>
