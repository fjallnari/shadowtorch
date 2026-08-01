<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import { activeView, colorTheme, currentTime } from '../stores';
	import AmbientMode from '../components/AmbientMode.svelte';
	import OverviewMode from '../components/OverviewMode.svelte';
	import Settings from '../components/Settings.svelte';
	import { THEMES } from '../util/themes';
	import { cssVarTheme, hexToRgb } from '../util/util';
	import AMBIENCE from '../classes/Ambience.svelte';
	import LIGHTS from '../classes/Lights.svelte';
	import { timer } from '../classes/Timer.svelte';
	import { onMount } from 'svelte';
	import { t } from '../classes/Torches.svelte';

	onMount(() => {
		timer.start();
		setInterval(() => {
			const now = Math.round(timer.getTime() / 1000);
			$currentTime = now;

			const blownOut = t.getExpired(now);
			if (blownOut.length > 0) {
				t.cleanUpTorches(blownOut, now);
				if (Object.keys(t.torches).some((id) => t.torches[id].isLit)) AMBIENCE.fire?.play();
			}
		}, 100);
	})

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

	$effect(() => {
		if (AMBIENCE.fire && torchesLit === 0) {
			AMBIENCE.fire.pause();
		}
	});


	// bucketed brightness of the longest torch
	// goes dark once the last torch burns out
	let prevLit = 0;
	let prevBucket = -1;
	let prevThemeId: string | null = null;
	const DIM_THRESHOLD = 600; // seconds — start dimming in the last 10 minutes
	const brightnessBucket = (remaining: number) => {
		if (remaining >= DIM_THRESHOLD) return 100;
		const b = Math.round(((remaining / DIM_THRESHOLD) * 100) / 10) * 10;
		return Math.max(10, Math.min(100, b));
	};
	$effect(() => {
		if (!LIGHTS.enabled) {
			prevLit = torchesLit;
			return;
		}
		const currLit = torchesLit;
		if (currLit === 0 && prevLit > 0) {
			LIGHTS.turnOff();
			prevBucket = -1;
			prevThemeId = null;
		} else if (currLit > 0) {
			const themeId = $colorTheme;
			const theme = THEMES.find((th) => th.id === themeId) ?? THEMES[0];
			const torch = longestTorch ? t.torches[longestTorch] : undefined;
			const remaining = torch ? torch.timeLeft - ($currentTime - torch.startTime) : 0;
			const bucket = brightnessBucket(Math.max(0, remaining));
			if (prevLit === 0 || bucket !== prevBucket || themeId !== prevThemeId) {
				LIGHTS.turnOn(bucket, hexToRgb(theme['--clr-accent-500']));
				prevBucket = bucket;
				prevThemeId = themeId;
			}
		}
		prevLit = currLit;
	});

</script>

<div
	class="w-screen h-screen grid grid-flow-row grid-cols-6 gap-4 font-vt323"
	style={cssVarTheme(THEMES.find((theme) => theme.id === $colorTheme) ?? THEMES[0])}
>
	<Navbar />
	{#if $activeView === 'ambient'}
		<AmbientMode {shortestTorch} {longestTorch} {torchesLit} />
	{:else if $activeView === 'overview'}
		<OverviewMode />
	{:else}
		<Settings />
	{/if}
	<audio src="fire-ambience.mp3" bind:this={AMBIENCE.fire} loop={true} ></audio>
	<audio src="torch-blowout.mp3" bind:this={AMBIENCE.blowout} ></audio>
</div>
