<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import { activeView, colorTheme } from '../stores';
	import type TorchInterface from '../interfaces/TorchInterface';
	import { nanoid } from 'nanoid/non-secure';
	import AmbientMode from '../components/AmbientMode.svelte';
	import OverviewMode from '../components/OverviewMode.svelte';
	import Settings from '../components/Settings.svelte';
	import { THEMES } from '../util/themes';
	import { cssVarTheme } from '../util/util';

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
		if (fireAmbience.paused) {
			fireAmbience.play();
		}
	}

	const handleDelete = (event: any) => {
		const id = event.detail.id;
		deleteTorch(id);
	};

	const deleteTorch = (id: string) => {
		if (!torches[id]) return;
		clearInterval(torches[id]?.intervalID);

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

	$: if (fireAmbience && torchesLit === 0) {
		fireAmbience.pause();
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
		fireAmbience.pause();
		torchBlowout.play();
		blownOutTorches.map((id) => deleteTorch(id));
		blownOutTorches = [];
		if (torchesLit != 0) {
			fireAmbience.play();
		}
	}
</script>

<div
	class="w-screen h-screen grid grid-flow-row grid-cols-6 gap-4 font-vt323"
	style={cssVarTheme(THEMES.find((theme) => theme.id === $colorTheme) ?? THEMES[0])}
>
	<Navbar />
	{#if $activeView === 'ambient'}
		<AmbientMode
			bind:torches
			bind:shortestTorch
			bind:longestTorch
			bind:torchesLit
			on:addtorch={() => addTorch()}
		/>
	{:else if $activeView === 'overview'}
		<OverviewMode bind:torches on:add={addTorch} on:delete={handleDelete} />
	{:else}
		<Settings bind:fireAmbience bind:torchBlowout />
	{/if}
	<audio src="fire-ambience.mp3" bind:this={fireAmbience} loop={true} ></audio>
	<audio src="torch-blowout.mp3" bind:this={torchBlowout} ></audio>
</div>
