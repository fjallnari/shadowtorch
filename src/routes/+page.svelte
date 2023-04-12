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


</script>

<div class="w-screen h-screen grid grid-flow-row grid-cols-6 gap-4 font-vt323">
	<Navbar />
	{#if $ambientMode}
		<AmbientMode bind:torches on:addtorch={() => addTorch()} />
	{:else}
		<OverviewMode bind:torches on:addtorch={() => addTorch()} />
	{/if}
</div>
