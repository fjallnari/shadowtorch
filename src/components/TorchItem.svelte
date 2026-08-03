<script lang="ts">
	import IconButton from './IconButton.svelte';
	import InPlaceEdit from './InPlaceEdit.svelte';
	import type Torch from '../classes/Torch.svelte';
	import TORCH_SETTINGS from '../classes/TorchSettings.svelte';
	import { currentTime } from '../stores';

	let {
		torch = $bindable(),
		deleteTorch
	}: {
		torch: Torch;
		deleteTorch: () => void;
	} = $props();

	let liveRemaining = $derived(
		torch.isLit ? torch.timeLeft - ($currentTime - torch.startTime) : torch.timeLeft
	);
	let dragValue: number | null = $state(null);

	const onInput = (event: Event) => {
		dragValue = Number((event.currentTarget as HTMLInputElement).value);
	};

	const onChange = (event: Event) => {
		const v = Number((event.currentTarget as HTMLInputElement).value);
		if (v <= 0) {
			deleteTorch();
			dragValue = null;
			return;
		}
		torch.timeLeft = v;
		torch.startTime = $currentTime;
		dragValue = null;
	};

	const formatTime = (seconds: number) => {
		const m = Math.floor(seconds / 60);
		const s = Math.floor(seconds % 60);
		return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
	};
</script>

<div
	class="grid grid-flow-col grid-cols-6 grid-rows-2 w-11/12 py-1 md:w-96 shadow-md
	{torch.isLit ? 'bg-accent-950' : 'bg-stone-800'}"
>
	<div class="row-span-2 col-span-2 flex justify-center items-center">
		<h1 class="text-2xl {torch.isLit ? '' : 'animate-pulse'}">
			{dragValue !== null ? formatTime(dragValue) : torch.prettyTime($currentTime)}
		</h1>
	</div>
	<div class="col-span-4 flex justify-center items-center">
		<h1 class="text-md">
			<InPlaceEdit bind:value={torch.name} />
		</h1>
	</div>
	<div class="col-span-4 flex justify-center items-center">
		<input
			id="time-range"
			type="range"
			min="0"
			max={TORCH_SETTINGS.maxSeconds}
			value={dragValue ?? liveRemaining}
			oninput={onInput}
			onchange={onChange}
			class="w-full h-2 bg-stone-700 rounded-none appearance-none cursor-pointer shadow-md"
		/>
	</div>
	<div class="row-span-2 col-span-2 flex justify-center gap-2 px-2 items-center text-xs">
		<IconButton
			icon={torch.isLit ? 'pixelarticons:pause' : 'pixelarticons:play'}
			click={() => torch.switch($currentTime)}
		/>
		<IconButton icon="pixelarticons:delete" click={() => deleteTorch()} />
	</div>
</div>

<style lang="css">
	#time-range::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		border-radius: 1px;
		height: 1em;
		width: 0.5em;
		background: var(--clr-accent-500);
		cursor: pointer;
	}

	#time-range::-moz-range-thumb {
		appearance: none;
		border-radius: 1px;
		border: none;
		height: 1em;
		width: 0.5em;
		background: var(--clr-accent-500);
		cursor: pointer;
	}
</style>
