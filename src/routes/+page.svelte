<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import { activeView, colorTheme } from '../stores';
	import AmbientMode from '../components/AmbientMode.svelte';
	import OverviewMode from '../components/OverviewMode.svelte';
	import Settings from '../components/Settings.svelte';
	import { THEMES } from '../util/themes';
	import { cssVarTheme } from '../util/util';
	import Torches from '../classes/Torches.svelte';
	import AMBIENCE from '../classes/Ambience.svelte';
	import Timer from '../classes/Timer.svelte';
	import pTimer from '../classes/TimerVariant.svelte';

	const timer = new Timer();
	timer.start();
	let currentTime = $state(0);

	var timerOne = pTimer.set(() => {
		console.log(new Date().toString(), Date.now(), 'timerOne', timerOne);
	}, 1000);

	// setInterval(() => {
	// 	currentTime = Math.round(timer.getTime() / 1000);
	// 	console.log(currentTime);
	// }, 100)

	let t = $state(new Torches());

	let torchesLit = $derived(Object.keys(t.torches).filter((id) => t.torches[id].isLit).length);

	/**
	 * Derives the shortest torch, i.e. the torch with the least time left
	 */
	let shortestTorch = $derived.by(() => {
		if (Object.keys(t.torches).length === 0 || torchesLit === 0) {
			return undefined;
		}
		return Object.keys(t.torches)
			.filter((id) => t.torches[id].isLit)
			.reduce((prev, curr) => (t.torches[prev].timeLeft < t.torches[curr].timeLeft ? prev : curr));
	});

	/* Derives the longest torch, i.e. the torch with the most time left */
	let longestTorch = $derived.by(() => {
		if (Object.keys(t.torches).length === 0 || torchesLit === 0) {
			return undefined;
		}
		return Object.keys(t.torches)
			.filter((id) => t.torches[id].isLit)
			.reduce((prev, curr) => (t.torches[prev].timeLeft > t.torches[curr].timeLeft ? prev : curr));
	});

	let blownOutTorches = $derived(Object.keys(t.torches).filter((id) => t.torches[id].timeLeft <= 0));

	$effect(() => {
		if (blownOutTorches.length > 0) {
			AMBIENCE.fire?.pause();
			AMBIENCE.blowout?.play();

			blownOutTorches.map((id) => t.deleteTorch(id));
			blownOutTorches = [];

			if (torchesLit != 0) {
				AMBIENCE.fire?.play();
			}
		}
	});

	$effect(() => {
		if (AMBIENCE.fire && torchesLit === 0) {
			AMBIENCE.fire.pause();
		}
	});
</script>

<div
	class="w-screen h-screen grid grid-flow-row grid-cols-6 gap-4 font-vt323"
	style={cssVarTheme(THEMES.find((theme) => theme.id === $colorTheme) ?? THEMES[0])}
>
	<Navbar />
	<div id="time">Current time: {currentTime}</div>
	{#if $activeView === 'ambient'}
		<AmbientMode bind:t {shortestTorch} {longestTorch} {torchesLit} />
	{:else if $activeView === 'overview'}
		<OverviewMode bind:t />
	{:else}
		<Settings />
	{/if}
	<audio src="fire-ambience.mp3" bind:this={AMBIENCE.fire} loop={true} ></audio>
	<audio src="torch-blowout.mp3" bind:this={AMBIENCE.blowout} ></audio>
</div>
