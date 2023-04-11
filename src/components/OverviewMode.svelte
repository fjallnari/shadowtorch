<script lang="ts">
	import type TorchInterface from '../interfaces/TorchInterface';
	import IconButton from './IconButton.svelte';
	import TorchItem from './TorchItem.svelte';
	import { nanoid } from 'nanoid/non-secure';

	export let torches: TorchInterface[] = [];

	const addTorch = () => {
		torches = torches.concat({
			id: nanoid(10),
			name: '',
			isLit: false
		});
	};

	const deleteTorch = (id: string) => {
		torches = torches.filter((torch) => torch.id !== id);
	};
</script>

<div class="row-span-6 col-span-full w-full h-full flex flex-col justify-start items-center gap-6">
	<div class="flex justify-center items-center col-span-full">
		<div class="flex justify-center items-center w-16 gap-4">
			<IconButton icon="pixelarticons:pause" on:click={() => {}} />
			<IconButton icon="pixelarticons:plus" on:click={() => addTorch()} />
		</div>
	</div>
	<div class="flex flex-row flex-wrap justify-center items-center gap-2 w-full">
		{#if torches.length === 0}
			<div class="">
				<h1 class="text-3xl font-vt323 uppercase">No torches</h1>
			</div>
		{:else}
			{#each torches as torch}
				<TorchItem bind:torch on:delete={() => deleteTorch(torch.id)} />
			{/each}
		{/if}
	</div>
</div>
