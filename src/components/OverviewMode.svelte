<script lang="ts">
	import IconButton from './IconButton.svelte';
	import TorchItem from './TorchItem.svelte';
	import type Torches from '../classes/Torches.svelte';
	import Torch from '../classes/Torch.svelte';

	let {
		t = $bindable(),
	}: {
		t: Torches
	} = $props();

</script>

<div class="row-span-6 col-span-full w-full h-full flex flex-col justify-start items-center gap-6">
	<div class="flex flex-row flex-wrap justify-center items-center gap-2 w-full">
		<div class="">
			<h1 class="text-3xl font-vt323 uppercase">Torch overview</h1>
		</div>
	</div>
	<div class="flex justify-center items-center col-span-full">
		<div class="flex justify-center items-center w-16 gap-4">
			<IconButton icon="pixelarticons:plus" click={() => t.addTorch(new Torch())} />
			<IconButton icon="pixelarticons:pause" click={() => t.pauseAllTorches()} />
			<IconButton icon="pixelarticons:sort" click={() => t.sortByTimeLeft()} />
			<IconButton icon="pixelarticons:clock" click={() => t.decrementRound()} />
		</div>
	</div>
	<div class="flex flex-row flex-wrap justify-center items-center gap-2 w-full mb-4">
		{#if Object.keys(t?.torches).length === 0}
			<div class="">
				<h1 class="text-3xl font-vt323 uppercase">No torches</h1>
			</div>
		{:else if t?.torches}
			{#each Object.keys(t.torches) as torchID}
				{#if t.torches[torchID] && t.torches[torchID].timeLeft > 0}
					<TorchItem bind:torch={t.torches[torchID]} deleteTorch={() => t.deleteTorch(torchID)} />
				{/if}
			{/each}
		{/if}
	</div>
</div>
