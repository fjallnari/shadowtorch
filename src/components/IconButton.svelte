<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let icon: string;
	export let width: string = '2em';
	export let height: string = width;

	const dispatch = createEventDispatcher();

	function clickButton() {
		dispatch('click', {});
	}
</script>

<button
	class="flex justify-center items-center w-full cursor-pointer transition ease-in duration-100 active:text-accent-300"
	on:click={() => clickButton()}
>
	<Icon {icon} {height} {width} />
</button>
