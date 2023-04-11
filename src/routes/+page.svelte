<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import { ambientMode } from '../stores';
	import AmbientMode from '../components/AmbientMode.svelte';
	import OverviewMode from '../components/OverviewMode.svelte';
	import type TorchInterface from '../interfaces/TorchInterface';

	let torches: TorchInterface[] = [];
</script>

<div class="w-screen h-screen grid grid-flow-row grid-cols-6 gap-4 font-vt323">
	<Navbar />
	{#if $ambientMode}
		<AmbientMode />
	{:else}
		<OverviewMode bind:torches />
	{/if}
</div>
