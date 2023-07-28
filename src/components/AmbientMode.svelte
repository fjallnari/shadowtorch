<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type TorchInterface from '../interfaces/TorchInterface';
	import { prettyTime } from '../util/util';
	import AnimatedTorch from './AnimatedTorch.svelte';
	import InPlaceEdit from './InPlaceEdit.svelte';
	import IconButton from './IconButton.svelte';

	export let torches: Record<string, Omit<TorchInterface, 'id'>>;
	export let torchesLit: number;
	export let shortestTorch: string | undefined;
	export let longestTorch: string | undefined;
	let screenHeight = 0;

	const dispatch = createEventDispatcher();

	const addTorch = () => {
		dispatch('addtorch');
	};

	$: imageScale =
		screenHeight < 425 ? '0.3388' : screenHeight < 560 ? '0.565' : screenHeight < 660 ? '0.87' : '1';
</script>

<div class="flex flex-col justify-center items-center row-span-2 col-span-full gap-1">
	<h1
		class="text-3xl font-vt323 text-accent-300 {shortestTorch && !torches[shortestTorch]?.isLit
			? 'animate-pulse'
			: ''}"
	>
		{shortestTorch
			? prettyTime(torches[shortestTorch]?.timeLeft)
			: Object.keys(torches).length === 0
			? 'No torches'
			: 'No torches lit'}
	</h1>
	{#if torchesLit - 1 > 0}
		<h1 class="text-xl font-vt323 text-zinc-400">
			{torchesLit - 1} other torch{torchesLit - 1 != 1 ? 'es' : ''} lit
		</h1>
	{/if}
	{#if torchesLit == 0 && Object.keys(torches).length != 0}
		<h1 class="text-xl font-vt323 text-zinc-400">
			{`${Object.keys(torches).length} unlit torch${Object.keys(torches).length != 1 ? 'es' : ''}`}
		</h1>
	{/if}
	{#if longestTorch}
		<h1 class="text-xl font-vt323 text-zinc-400">
			Darkness in {prettyTime(torches[longestTorch]?.timeLeft)}
		</h1>
	{/if}
</div>
<div
	class="flex justify-center items-center row-span-5 col-span-full min-h-0"
	style="transform: scale({imageScale});"
>
	{#if torchesLit != 0}
		<AnimatedTorch />
	{:else}
		<img src="torch-unlit.png" alt="unlit-torch" width="177" height="463" />
	{/if}
</div>
<div class="flex flex-col justify-evenly items-center row-span-3 col-span-full mb-2">
	{#if shortestTorch}
		<h1 class="font-vt323 text-2xl text-zinc-400">
			<InPlaceEdit bind:value={torches[shortestTorch].name} on:submit={() => {}} />
		</h1>
	{:else}
		<h1 class="text-3xl font-vt323">Add a torch</h1>
		<IconButton icon="pixelarticons:plus" on:click={() => addTorch()} />
	{/if}
</div>
<svelte:window bind:innerHeight={screenHeight} />
