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

<div
	class="flex justify-center items-center w-full cursor-pointer transition ease-in duration-100 active:text-sky-500"
	on:click={() => clickButton()}
	on:keyup={() => {}}
>
	<Icon {icon} {height} {width} />
</div>
