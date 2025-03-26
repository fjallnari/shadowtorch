<script lang="ts">
	import { onMount } from 'svelte';
	import { getDefaultIfEmpty, isTextNonEmpty } from '../util/util';
	import { Input } from "../components/input";

	let { 
		value = $bindable(),
	}: { value: string } = $props();

	const DEFAULT_VALUE = '---';
	let editing: boolean = $state(false);
	let original: string = $state(value);

	onMount(() => {
		original = value;
	});

	const edit = () => {
		editing = true;
		original = value;
	};

	const submit = () => {
		editing = false;
	};

	const keydown = (event: any) => {
		// Cancel editing on escape
		if (event.key == 'Escape') {
			event.preventDefault();
			value = original;
			editing = false;
		}
		// submit on enter
		if (event.key == 'Enter') {
			event.preventDefault();
			submit();
		}
	};
</script>

{#if editing}
	<div class="flex justify-center items-center w-full">
		<Input 
			type="text" 
			onblur={submit}
			onkeydown={keydown}
			variant="default"
			bind:value
		/>
	</div>
{:else}
	<button
		class="cursor-text border border-solid border-transparent {isTextNonEmpty(value) ? '' : ' placeholder'}"
		onclick={() => edit()}
	>
		{getDefaultIfEmpty(value, DEFAULT_VALUE)}
	</button>
{/if}

<style>
	.placeholder {
		color: #8e8e8e;
	}
</style>
