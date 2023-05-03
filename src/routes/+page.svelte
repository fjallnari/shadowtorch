<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import { ambientMode, audioEnabled } from '../stores';
	import type TorchInterface from '../interfaces/TorchInterface';
	import { nanoid } from 'nanoid/non-secure';
	import AmbientMode from '../components/AmbientMode.svelte';
	import OverviewMode from '../components/OverviewMode.svelte';

	let torches: Record<string, Omit<TorchInterface, 'id'>> = {};
	let fireAmbience: HTMLAudioElement;
	let torchBlowout: HTMLAudioElement;

	const addTorch = () => {
		const id = nanoid(10);

		torches = Object.assign(torches, {
			[id]: { name: '', timeLeft: 3600, isLit: false }
		});

		lightTorch(id);
	};

	function lightTorch(id: string) {
		torches[id].intervalID = setInterval(() => {
			torches[id].timeLeft -= 1;
			if (torches[id].timeLeft === 0) {
				clearInterval(torches[id].intervalID);
				torches[id].isLit = false;
			}
		}, 1000);
		torches[id].isLit = true;
	}

	// const switchTorch = (torch: TorchInterface | undefined) => {
	// 	if (!torch) return;

	// 	torches = torches.map((torchIter) => {
	// 		if (torchIter.id === torch.id) {
	// 			torchIter.isLit = !torchIter.isLit;
	// 			if (torchIter.isLit) {
	// 				torchIter.intervalID = setInterval(() => {
	// 					torchIter.timeLeft -= 1;
	// 					if (torchIter.timeLeft === 0) {
	// 						clearInterval(torchIter.intervalID);
	// 						torchIter.isLit = false;
	// 					}
	// 				}, 1000);
	// 			}
	// 		}
	// 		return torchIter;
	// 	});
	// };

	const handleDelete = (event: any) => {
		const id = event.detail.id;
		deleteTorch(id);
	};

	const deleteTorch = (id: string) => {
		clearInterval(torches[id].intervalID);

		shortestTorch = shortestTorch === id ? undefined : shortestTorch;
		longestTorch = longestTorch === id ? undefined : longestTorch;

		// ? Uncomment if we want to play blowout when torch is deleted
		// if (torches[id].isLit) {
		// 	torchBlowout.play();
		// }

		torches = Object.assign(
			{},
			...Object.keys(torches)
				.filter((idIter) => idIter != id)
				.map((idIter) => ({ [idIter]: torches[idIter] }))
		);
	};

	$: torchesLit = Object.keys(torches).filter((id) => torches[id].isLit).length;

	$: if (fireAmbience && torchBlowout) {
		if (fireAmbience.paused && torchesLit > 0) {
			fireAmbience.play();
		} else if (torchesLit === 0) {
			fireAmbience.pause();
		}
	}

	$: shortestTorch =
		Object.keys(torches).length === 0 || torchesLit === 0
			? undefined
			: Object.keys(torches)
					.filter((id) => torches[id].isLit)
					.reduce((prev, curr) => (torches[prev].timeLeft < torches[curr].timeLeft ? prev : curr));

	$: longestTorch =
		Object.keys(torches).length === 0 || torchesLit === 0
			? undefined
			: Object.keys(torches)
					.filter((id) => torches[id].isLit)
					.reduce((prev, curr) => (torches[prev].timeLeft > torches[curr].timeLeft ? prev : curr));

	$: blownOutTorches = Object.keys(torches).filter((id) => torches[id].timeLeft <= 0);

	$: if (blownOutTorches.length > 0) {
		torchBlowout.play();
		blownOutTorches.map((id) => deleteTorch(id));
	}
</script>

<div class="w-screen h-screen grid grid-flow-row grid-cols-6 gap-4 font-vt323">
	<Navbar bind:fireAmbience bind:torchBlowout />
	{#if $ambientMode}
		<AmbientMode
			bind:torches
			bind:shortestTorch
			bind:longestTorch
			bind:torchesLit
			on:addtorch={() => addTorch()}
		/>
	{:else}
		<OverviewMode bind:torches on:add={addTorch} on:delete={handleDelete} />
	{/if}
	<audio src="mixkit-campfire-crackles-1330.mp3" bind:this={fireAmbience} loop={true} />
	<audio src="torch-blowout.mp3" bind:this={torchBlowout} />
</div>
