<script lang="ts">
	import AMBIENCE from '../classes/Ambience.svelte';
	import LIGHTS from '../classes/Lights.svelte';
	import TORCH_SETTINGS from '../classes/TorchSettings.svelte';
	import type Theme from '../interfaces/Theme';
	import { colorTheme } from '../stores';
	import { THEMES } from '../util/themes';
	import { cssVarTheme, hexToRgb } from '../util/util';
	import IconButton from './IconButton.svelte';

	const selectTheme = (theme: Theme) => {
		localStorage.theme = theme.id;
		colorTheme.set(theme.id);
	};

	const testLights = () => {
		const theme = THEMES.find((th) => th.id === $colorTheme) ?? THEMES[0];
		LIGHTS.turnOn(100, hexToRgb(theme['--clr-accent-500']));
	};
</script>

<div
	class="row-span-6 col-span-full w-full h-full flex flex-col justify-start items-center gap-10 font-vt323"
>
	<h1 class="text-3xl uppercase">settings</h1>
	<div class="flex flex-col md:flex-row justify-center items-center w-full gap-4">
		<div class="w-fit">
			<IconButton
				icon={AMBIENCE.fireEnabled ? '@custom:pixel:fire' : 'pixelarticons:volume-x'}
				click={() => AMBIENCE.switchFire()}
			/>
		</div>
		<h1 class="text-2xl uppercase">fire ambience on/off</h1>
		<div class="w-fit">
			<IconButton
				icon={AMBIENCE.blowoutEnabled ? 'pixelarticons:wind' : 'pixelarticons:volume-x'}
				click={() => AMBIENCE.switchBlowout()}
			/>
		</div>
		<h1 class="text-2xl uppercase">blowout on/off</h1>
		<div class="w-fit">
			<IconButton
				icon={TORCH_SETTINGS.blitzMode ? 'pixelarticons:zap' : 'pixelarticons:zap-off'}
				click={() => (TORCH_SETTINGS.blitzMode = !TORCH_SETTINGS.blitzMode)}
			/>
		</div>
		<h1 class="text-2xl uppercase">blitz mode on/off (30/60 min)</h1>
	</div>
	{#if LIGHTS.enabled}
		<div class="flex flex-col justify-center items-center w-11/12 gap-4">
			<div class="flex flex-col md:flex-row justify-center items-center w-full gap-4">
				<button
					class="text-2xl uppercase text-accent-300 underline cursor-pointer"
					onclick={testLights}>test</button
				>
			</div>
			<p class="text-center text-lg text-zinc-400">
				Lights configured via environment (Home Assistant proxy). No further setup needed here.
			</p>
			<h1 class="text-2xl uppercase">home assistant</h1>
		</div>
	{/if}
	<div class="flex flex-col justify-center items-center w-11/12 gap-4">
		<div class="grid grid-cols-3 gap-2">
			{#each THEMES as theme}
				<button
					aria-label="theme-switch"
					data-theme="minimalist"
					class="w-10 h-10 p-1 bg-accent-300 {$colorTheme === theme.id
						? 'bg-clip-content border-2 border-solid'
						: ''}"
					style={cssVarTheme(theme)}
					onclick={() => selectTheme(theme)}
				></button>
			{/each}
		</div>
		<h1 class="text-2xl uppercase">theme</h1>
	</div>
	<div class="flex flex-col justify-center items-center w-11/12 gap-2">
		<p class="text-center">
			Animated torch created by <a
				href="https://nyknck.itch.io/"
				title="nyknck"
				class="text-accent-300">@NYKNCK</a
			>.
		</p>
		<p class="text-center">
			Fire ambience by Mixkit provided under the <a
				href="https://mixkit.co/license/#sfxFree"
				title="Mixkit License"
				class="text-accent-300">Mixkit Sound Effects Free License</a
			>.
		</p>
		<p class="text-center">
			App created by <a
				href="https://fjallnari.com/"
				title="fjallnari"
				class="text-accent-300">fjallnari</a
			>, is
			<a href="https://github.com/fjallnari/shadowtorch" title="source code" class="text-accent-300"
				>open-sourced</a
			> under the MIT license.
		</p>
		<h1 class="text-2xl uppercase">about</h1>
	</div>
</div>
