<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type TorchInterface from '../interfaces/TorchInterface';
	import IconButton from './IconButton.svelte';
	import TorchItem from './TorchItem.svelte';

	export let torches: TorchInterface[] = [];

	const dispatch = createEventDispatcher();

	const addTorch = () => {
		pauseAllTorches();
		dispatch('addtorch');
	};

	const deleteTorch = (torchToDelete: TorchInterface) => {
		pauseAllTorches();
		clearInterval(torchToDelete.intervalID);
		torches = torches.filter((torch) => torch.id !== torchToDelete.id);
	};

	const pauseAllTorches = () => {
		torches = torches.map((torch) => {
			clearInterval(torch.intervalID);
			torch.isLit = false;
			return torch;
		});
	};

	const sortTorches = () => {
		pauseAllTorches();
		torches = torches.sort((a, b) => a.timeLeft - b.timeLeft);
	};

	$: blownOutTorches = torches.filter(torch => torch.timeLeft <= 0);

	$: if (blownOutTorches.length > 0) {
		blownOutTorches.map(torch => deleteTorch(torch));
	}


</script>

<div class="row-span-6 col-span-full w-full h-full flex flex-col justify-start items-center gap-6">
	<div class="flex flex-row flex-wrap justify-center items-center gap-2 w-full">
		<div class="">
			<h1 class="text-3xl font-vt323 uppercase">Torch overview</h1>
		</div>
	</div>
	<div class="flex justify-center items-center col-span-full">
		<div class="flex justify-center items-center w-16 gap-4">
			<IconButton icon="pixelarticons:plus" on:click={() => addTorch()} />
			<IconButton icon="pixelarticons:pause" on:click={() => pauseAllTorches()} />
			<IconButton icon="pixelarticons:sort" on:click={() => sortTorches()} />
		</div>
	</div>
	<div class="flex flex-row flex-wrap justify-center items-center gap-2 w-full">
		{#if torches.length === 0}
			<div class="">
				<h1 class="text-3xl font-vt323 uppercase">No torches</h1>
			</div>
		{:else}
			{#each torches as torch}
				<TorchItem bind:torch on:delete={() => deleteTorch(torch)} />
			{/each}
		{/if}
	</div>
</div>
