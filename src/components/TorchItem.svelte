<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type TorchInterface from '../interfaces/TorchInterface';
	import IconButton from './IconButton.svelte';
	import InPlaceEdit from './InPlaceEdit.svelte';
	import { prettyTime } from '../util/util';

	export let torch: Omit<TorchInterface, 'id'>;

	const dispatch = createEventDispatcher();

	const deleteTorch = () => {
		dispatch('delete', {
			torch
		});
	};

	const switchTorch = () => {
		torch.isLit = !torch.isLit;

		if (torch.isLit) {
			lightTorch();
		} else {
			clearInterval(torch.intervalID);
		}
	};

	function lightTorch() {
		torch.intervalID = setInterval(() => {
			torch.timeLeft -= 1;
			if (torch.timeLeft === 0) {
				clearInterval(torch.intervalID);
				torch.isLit = false;
			}
		}, 1000);
	}

	// $: if (torch.timeLeft <= 0) {
	// 	deleteTorch();
	// }
</script>

<div
	class="grid grid-flow-col grid-cols-6 grid-rows-2 {torch.isLit
		? 'bg-sky-950'
		: 'bg-stone-800'} w-11/12 py-1 md:w-96 shadow-md"
>
	<div class="row-span-2 col-span-2 flex justify-center items-center">
		<h1 class="text-2xl {torch.isLit ? '' : 'animate-pulse'}">{prettyTime(torch.timeLeft)}</h1>
	</div>
	<div class="col-span-4 flex justify-center items-center">
		<h1 class="text-md">
			<InPlaceEdit bind:value={torch.name} on:submit={() => {}} />
		</h1>
	</div>
	<div class="col-span-4 flex justify-center items-center">
		<input
			bind:value={torch.timeLeft}
			id="time-range"
			type="range"
			max="3600"
			class="w-full h-2 bg-stone-700 rounded-none appearance-none cursor-pointer shadow-md"
		/>
	</div>
	<div class="row-span-2 col-span-2 flex justify-center gap-2 px-2 items-center text-xs">
		<IconButton
			icon={torch.isLit ? 'pixelarticons:pause' : 'pixelarticons:play'}
			on:click={() => switchTorch()}
		/>
		<IconButton icon="pixelarticons:delete" on:click={() => deleteTorch()} />
	</div>
</div>

<style lang="css">
	#time-range::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		border-radius: 1px;
		height: 1em;
		width: 0.5em;
		background: theme('colors.sky.500');
		cursor: pointer;
	}

	#time-range::-moz-range-thumb {
		appearance: none;
		border-radius: 1px;
		border: none;
		height: 1em;
		width: 0.5em;
		background: theme('colors.sky.500');
		cursor: pointer;
	}
</style>
