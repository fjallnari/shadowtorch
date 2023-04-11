<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type TorchInterface from '../interfaces/TorchInterface';
	import IconButton from './IconButton.svelte';
	import InPlaceEdit from './InPlaceEdit.svelte';

	export let torch: TorchInterface;

	const dispatch = createEventDispatcher();

	const deleteTorch = () => {
		dispatch('delete', {
			torch
		});
	};

	const switchTorch = () => {
		torch.isLit = !torch.isLit;
	};
</script>

<div class="grid grid-flow-col grid-cols-6 grid-rows-2 bg-stone-800 w-11/12">
	<div class="row-span-2 col-span-3 flex justify-center items-center">
		<h1 class="text-2xl">47:21</h1>
	</div>
	<div class="col-span-4 flex justify-center items-center">
		<h1 class="text-md">
			<InPlaceEdit bind:value={torch.name} on:submit={() => {}} />
		</h1>
	</div>
	<div class="col-span-4 flex justify-center items-center">time-bar</div>
	<div class="row-span-2 col-span-2 flex justify-center gap-2 px-2 items-center text-xs">
		<IconButton
			icon={torch.isLit ? 'pixelarticons:pause' : 'pixelarticons:play'}
			on:click={() => switchTorch()}
		/>
		<IconButton icon="pixelarticons:delete" on:click={() => deleteTorch()} />
	</div>
</div>
