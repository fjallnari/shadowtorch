<script lang="ts">
	import InPlaceEdit from './InPlaceEdit.svelte';
	import type TorchInterface from '../interfaces/TorchInterface';
	import { prettyTime } from '../util/util';
	import IconButton from './IconButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import AnimatedTorch from './AnimatedTorch.svelte';

	export let torches: TorchInterface[] = [];

	const dispatch = createEventDispatcher();

	const addTorch = () => {
		dispatch('addtorch');
	};

	const lightTorch = (torch: TorchInterface | undefined) => {
		if (!torch) return;
		torch.isLit = true;
		torch.intervalID = setInterval(() => {
			torch.timeLeft -= 1;
			if (torch.timeLeft === 0) {
				clearInterval(torch.intervalID);
				torch.isLit = false;
			}
		},1000);
	}

	$: torchesLit = torches.filter((torch) => torch.isLit).length;

	$: shortestTorch = torches.length == 0 ? undefined : torches.reduce((prev, curr) => prev.timeLeft < curr.timeLeft ? prev : curr);
	$: longestTorch = torches.length == 0 ? undefined : torches.reduce((prev, curr) => prev.timeLeft > curr.timeLeft ? prev : curr);

	const pauseTorch = (torch: TorchInterface | undefined) => {
		if (!torch) return;
		clearInterval(torch.intervalID);
		torch.isLit = false;
	};

</script>

<div class="flex flex-col justify-evenly items-center row-span-3 col-span-full">
	<h1 class="text-3xl font-vt323 text-sky-300 {shortestTorch && !shortestTorch.isLit ? "animate-pulse": ""}">
		{shortestTorch ? prettyTime(shortestTorch?.timeLeft) : "No torches"}
	</h1>
	{#if torchesLit - 1 > 0}
		<h1 class="text-xl font-vt323 text-zinc-400">
			{torchesLit - 1} other torch{torchesLit - 1 != 1 ? "es": ""} lit
		</h1>
	{/if}
	{#if longestTorch}
		<h1 class="text-xl font-vt323 text-zinc-400">
			Darkness in {prettyTime(longestTorch?.timeLeft)}
		</h1>
	{/if}
</div>
<div class="flex justify-center items-center row-span-5 col-span-full">
	{#if torchesLit != 0}
		<AnimatedTorch />
	{/if}
</div>
<div class="flex flex-col justify-evenly items-center row-span-3 col-span-full">
	{#if shortestTorch}
		<div class="flex justify-center items-center gap-4 text-zinc-100">
			{#if shortestTorch?.isLit}
				<IconButton icon="pixelarticons:pause" on:click={() => pauseTorch(shortestTorch)} />
			{:else}
				<IconButton icon="pixelarticons:play" on:click={() => lightTorch(shortestTorch)} />
			{/if}
		</div>
		<h1 class="font-vt323 text-2xl text-zinc-400">
			<InPlaceEdit bind:value={shortestTorch.name} on:submit={() => {}} />
		</h1>
	{:else}
		<h1 class="text-3xl font-vt323">Light a new torch</h1>
		<IconButton icon="pixelarticons:plus" on:click={() => addTorch()} />
	{/if}
</div>
