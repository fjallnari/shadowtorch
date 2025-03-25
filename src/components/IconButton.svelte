<script lang="ts">
	import Icon from '@iconify/svelte';
	
	let {
		icon, 
		width = "2em",
		height = width,
		click
	}: {
		icon: string;
		width?: string;
		height?: string;
		click: () => void;
	} = $props();

</script>

<button
	class="flex justify-center items-center w-full cursor-pointer transition ease-in duration-100 active:text-accent-300"
	onclick={click}
>
	<Icon {icon} {height} {width} />
</button>
