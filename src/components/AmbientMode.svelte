<script lang="ts">
	import Icon from '@iconify/svelte';
	import dayjs from 'dayjs';
	import InPlaceEdit from './InPlaceEdit.svelte';

	let name = "Gruwid's torch";
</script>

<div class="flex flex-col justify-evenly items-center row-span-3 col-span-full">
	<h1 class="text-3xl font-vt323 text-amber-600">
		{dayjs().format('mm:ss')}
	</h1>
</div>
<div class="flex justify-center items-center row-span-5 col-span-full">
	<h1 class="text-amber-600 uppercase">
		<img src="https://placehold.co/400" alt="Fire" class="w-64 h-64" />
	</h1>
</div>
<div class="flex flex-col justify-evenly items-center row-span-3 col-span-full">
	<div class="flex justify-center items-center gap-4 text-zinc-100">
		<Icon icon="pixelarticons:pause" height="2em" width="2em" />
		<Icon icon="pixelarticons:drop-full" height="2em" width="2em" />
	</div>
	<h1 class="font-vt323 text-2xl text-zinc-400">
		<InPlaceEdit bind:value={name} on:submit={() => {}} />
	</h1>
</div>
