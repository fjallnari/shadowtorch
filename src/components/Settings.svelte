<script lang="ts">
	import type Theme from '../interfaces/Theme';
	import { blowoutSoundEnabled, ambienceSoundEnabled, colorTheme } from '../stores';
	import { THEMES } from '../util/themes';
	import { cssVarTheme } from '../util/util';
	import IconButton from './IconButton.svelte';

	export let fireAmbience: HTMLAudioElement;
	export let torchBlowout: HTMLAudioElement;

	const switchAmbienceSound = () => {
		ambienceSoundEnabled.set(!$ambienceSoundEnabled);
		fireAmbience.muted = !$ambienceSoundEnabled;
	};

	const switchBlowoutSound = () => {
		blowoutSoundEnabled.set(!$blowoutSoundEnabled);
		torchBlowout.muted = !$blowoutSoundEnabled;
	};

	const selectTheme = (theme: Theme) => {
		localStorage.theme = theme.id;
		colorTheme.set(theme.id);
	};
</script>

<div
	class="row-span-6 col-span-full w-full h-full flex flex-col justify-start items-center gap-10 font-vt323"
>
	<h1 class="text-3xl uppercase">settings</h1>
	<div class="flex flex-col md:flex-row justify-center items-center w-full gap-4">
		<div class="w-fit">
			<IconButton
				icon={$ambienceSoundEnabled ? '@custom:pixel:fire' : 'pixelarticons:volume-x'}
				on:click={() => switchAmbienceSound()}
			/>
		</div>
		<h1 class="text-2xl uppercase">fire ambience on/off</h1>
		<div class="w-fit">
			<IconButton
				icon={$blowoutSoundEnabled ? 'pixelarticons:wind' : 'pixelarticons:volume-x'}
				on:click={() => switchBlowoutSound()}
			/>
		</div>
		<h1 class="text-2xl uppercase">blowout on/off</h1>
	</div>
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
					on:click={() => selectTheme(theme)}
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
