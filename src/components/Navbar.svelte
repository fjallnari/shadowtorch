<script lang="ts">
	import { ambientMode, audioEnabled } from '../stores';
	import IconButton from './IconButton.svelte';

	export let fireAmbience: HTMLAudioElement;

	const switchView = () => {
		ambientMode.set(!$ambientMode);
	};

	const switchAudio = () => {
		audioEnabled.set(!$audioEnabled);
		fireAmbience.muted = !$audioEnabled;
	};
</script>

<div
	class="h-min col-span-full flex justify-center items-center gap-4 p-2 text-zinc-100 bg-stone-800 shadow-md"
>
	<div class="flex justify-center items-center w-16">
		<IconButton
			icon={$audioEnabled ? 'pixelarticons:volume-3' : 'pixelarticons:volume-x'}
			on:click={() => switchAudio()}
		/>
	</div>
	<h1 class="w-full text-center text-3xl font-vt323 uppercase">Shadowtorch</h1>
	<div class="flex justify-center items-center w-16">
		<IconButton
			icon={$ambientMode ? 'pixelarticons:script-text' : 'pixelarticons:moon-stars'}
			on:click={() => switchView()}
		/>
	</div>
</div>
