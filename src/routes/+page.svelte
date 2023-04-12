<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import { ambientMode } from '../stores';
	import AmbientMode from '../components/AmbientMode.svelte';
	import OverviewMode from '../components/OverviewMode.svelte';
	import type TorchInterface from '../interfaces/TorchInterface';
	import { nanoid } from 'nanoid/non-secure';

	let torches: TorchInterface[] = [];

	const addTorch = () => {
		torches = torches.concat({
			id: nanoid(10),
			name: '',
			timeLeft: 3600,
			isLit: false
		});
	};

	const switchTorch = (torch: TorchInterface | undefined) => {
		if (!torch) return;

		torches = torches.map((torchIter) => {
			if (torchIter.id === torch.id) {
				torchIter.isLit = !torchIter.isLit;
				if (torchIter.isLit) {
					torchIter.intervalID = setInterval(() => {
						torchIter.timeLeft -= 1;
						if (torchIter.timeLeft === 0) {
							clearInterval(torchIter.intervalID);
							torchIter.isLit = false;
						}
					}, 1000);
				}
			}
			return torchIter;
		});
	};

	$: torchesLit = torches.filter((torch) => torch.isLit).length;
	$: shortestTorch =
		torches.length == 0
			? undefined
			: torches.reduce((prev, curr) => (prev.timeLeft < curr.timeLeft ? prev : curr));
	$: longestTorch =
		torches.length == 0
			? undefined
			: torches.reduce((prev, curr) => (prev.timeLeft > curr.timeLeft ? prev : curr));
</script>

<div class="w-screen h-screen grid grid-flow-row grid-cols-6 gap-4 font-vt323">
	<Navbar />
	{#if $ambientMode}
		<AmbientMode
			on:addtorch={() => addTorch()}
			{switchTorch}
			bind:torchesLit
			bind:shortestTorch
			bind:longestTorch
		/>
	{:else}
		<OverviewMode bind:torches on:addtorch={() => addTorch()} />
	{/if}
</div>
