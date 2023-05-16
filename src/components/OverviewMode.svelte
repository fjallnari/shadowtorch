<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type TorchInterface from '../interfaces/TorchInterface';
	import IconButton from './IconButton.svelte';
	import TorchItem from './TorchItem.svelte';

	export let torches: Record<string, Omit<TorchInterface, 'id'>>;

	const dispatch = createEventDispatcher();

	const addTorch = () => {
		dispatch('add');
	};

	const deleteTorch = (torchID: string) => {
		dispatch('delete', {
			id: torchID
		});
	};

	const pauseAllTorches = () => {
		if (Object.keys(torches).length === 0) return;
		torches = Object.assign(
			{},
			...Object.keys(torches).map((idIter) => {
				clearInterval(torches[idIter].intervalID);
				return {
					[idIter]: Object.assign(torches[idIter], {
						isLit: false
					})
				};
			})
		);
	};

	const decrementRound = () => {
		if (Object.keys(torches).length === 0) return;
		torches = Object.assign(
			{},
			...Object.keys(torches).map((idIter) => ({
				[idIter]: Object.assign(torches[idIter], {
					timeLeft: torches[idIter].isLit
						? torches[idIter].timeLeft - 600
						: torches[idIter].timeLeft
				})
			}))
		);
	};

	const sortTorches = () => {
		if (Object.keys(torches).length === 0) return;
		torches = Object.assign(
			{},
			...Object.keys(torches)
				.sort((a, b) => torches[a].timeLeft - torches[b].timeLeft)
				.map((idIter) => ({ [idIter]: torches[idIter] }))
		);
	};
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
			<IconButton icon="pixelarticons:clock" on:click={() => decrementRound()} />
		</div>
	</div>
	<div class="flex flex-row flex-wrap justify-center items-center gap-2 w-full">
		{#if Object.keys(torches).length === 0}
			<div class="">
				<h1 class="text-3xl font-vt323 uppercase">No torches</h1>
			</div>
		{:else}
			{#each Object.keys(torches) as torchID}
				{#if torches[torchID] && torches[torchID].timeLeft > 0}
					<TorchItem bind:torch={torches[torchID]} on:delete={() => deleteTorch(torchID)} />
				{/if}
			{/each}
		{/if}
	</div>
</div>
