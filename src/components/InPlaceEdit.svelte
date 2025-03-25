<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { getDefaultIfEmpty, isTextNonEmpty } from '../util/util';

	let { 
		value = $bindable(),
		required = true
	}: { value: string, required?: boolean } = $props();
	const defaultValue = '---';

	let editing = $state(false);
	let original: string = $state(value);

	const dispatch = createEventDispatcher();

	onMount(() => {
		original = value;
	});

	const edit = () => {
		editing = true;
		original = value;
	};

	const submit = () => {
		if (value !== original) {
			dispatch('submit', value);
		}

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

	const focus = (element: any) => {
		element.focus();
	};

</script>

{#if editing}
	<form on:submit|preventDefault={submit} on:keydown={keydown}>
		<input
			class="bg-inherit border-none border-r-4 outline outline-1 outline-accent-300 text-center"
			bind:value
			on:blur={submit}
			{required}
			use:focus
		/>
	</form>
{:else}
	<button
		class="cursor-text border border-solid border-transparent {isTextNonEmpty(value) ? '' : ' placeholder'}"
		on:click={() => edit()}
	>
		{getDefaultIfEmpty(value, defaultValue)}
	</button>
{/if}

<style>
	.placeholder {
		color: #8e8e8e;
	}
</style>
