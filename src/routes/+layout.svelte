<script>
	import '../app.css';
</script>

<slot />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.stone.900);
		color: theme(colors.zinc.100);
	}
</style>
