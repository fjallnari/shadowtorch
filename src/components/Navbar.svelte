<script lang="ts">
	import { activeView } from '../stores';
	import IconButton from './IconButton.svelte';

	const switchView = (newView: string) => {
		activeView.set(newView);
	};

</script>

<div
	class="h-min col-span-full flex justify-center items-center gap-4 p-2 text-zinc-100 bg-stone-800 shadow-md"
>
	<div class="flex justify-center items-center w-16">
		{#if $activeView === 'ambient' || $activeView === 'overview'}
			<IconButton
				icon={'pixelarticons:dashboard'}
				on:click={() => switchView('settings')}
			/>
		{:else}
			<IconButton
				icon={'pixelarticons:moon-stars'}
				on:click={() => switchView('ambient')}
			/>
		{/if}
	</div>
	<h1 class="w-full text-center text-3xl font-vt323 uppercase">Shadowtorch</h1>
	<div class="flex justify-center items-center w-16">
		{#if $activeView === 'ambient' || $activeView === 'settings'}
			<IconButton
				icon={'pixelarticons:script-text'}
				on:click={() => switchView('overview')}
			/>
		{:else}
			<IconButton
				icon={'pixelarticons:moon-stars'}
				on:click={() => switchView('ambient')}
			/>
		{/if}
	</div>
</div>
