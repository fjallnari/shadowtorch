<script lang="ts">
	import { ambientMode } from '../stores';
	import IconButton from './IconButton.svelte';

	const switchView = () => {
		ambientMode.set(!$ambientMode);
	};
</script>

<div
	class="h-min col-span-full flex justify-center items-center gap-4 p-2 text-zinc-100 bg-stone-800 shadow-md"
>
	<div class="w-16" />
	<h1 class="w-full text-center text-3xl font-vt323 uppercase">Torch tracker</h1>
	<div class="flex justify-center items-center w-16">
		<IconButton
			icon={$ambientMode ? 'pixelarticons:script-text' : 'pixelarticons:moon-stars'}
			on:click={() => switchView()}
		/>
	</div>
</div>
