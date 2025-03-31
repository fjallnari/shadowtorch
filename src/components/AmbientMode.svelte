<script lang="ts">
	import AnimatedTorch from './AnimatedTorch.svelte';
	import InPlaceEdit from './InPlaceEdit.svelte';
	import IconButton from './IconButton.svelte';
	import Torch from '../classes/Torch.svelte';
	import { currentTime } from '../stores';
	import { t } from '../classes/Torches.svelte';

	let {
		torchesLit,
		shortestTorch = "",
		longestTorch
	}: {
		torchesLit: number;
		shortestTorch: string | undefined;
		longestTorch: string | undefined;
	} = $props();

	let screenHeight = $state(0);

	let imageScale = $derived.by(() => {
		if (screenHeight < 425) return '0.3388';
		if (screenHeight < 560) return '0.565';
		if (screenHeight < 660) return '0.87';
		return '1';
	});

</script>

<div class="flex flex-col justify-center items-center row-span-2 col-span-full gap-1">
	<h1
		class="text-3xl font-vt323 text-accent-300 {t.torches[shortestTorch] && !t.torches[shortestTorch].isLit
			? 'animate-pulse'
			: ''}"
	>
		{t.torches[shortestTorch] ? t.torches[shortestTorch]?.prettyTime($currentTime)
		: Object.keys(t.torches).length === 0 ? 'No torches': 'No torches lit'}
	</h1>
	{#if torchesLit - 1 > 0}
		<h1 class="text-xl font-vt323 text-zinc-400">
			{torchesLit - 1} other torch{torchesLit - 1 != 1 ? 'es' : ''} lit
		</h1>
	{/if}
	{#if torchesLit == 0 && Object.keys(t.torches).length != 0}
		<h1 class="text-xl font-vt323 text-zinc-400">
			{`${Object.keys(t.torches).length} unlit torch${Object.keys(t.torches).length != 1 ? 'es' : ''}`}
		</h1>
	{/if}
	{#if longestTorch}
		<h1 class="text-xl font-vt323 text-zinc-400">
			Darkness in {t.torches[longestTorch]?.prettyTime($currentTime)}
		</h1>
	{/if}
</div>
<div
	class="flex justify-center items-center row-span-5 col-span-full min-h-0"
	style="transform: scale({imageScale});"
>
	{#if torchesLit != 0}
		<AnimatedTorch />
	{:else}
		<img src="torch-unlit.png" alt="unlit-torch" width="177" height="463" />
	{/if}
</div>
<div class="flex flex-col justify-evenly items-center row-span-3 col-span-full mb-2">
	{#if shortestTorch}
		<h1 class="font-vt323 text-2xl text-zinc-400">
			<InPlaceEdit bind:value={t.torches[shortestTorch].name} />
		</h1>
	{:else}
		<h1 class="text-3xl font-vt323">Add a torch</h1>
		<IconButton icon="pixelarticons:plus" click={() => t.addTorch(new Torch(), true)} />
	{/if}
</div>
<svelte:window bind:innerHeight={screenHeight} />
