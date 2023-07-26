<script lang="ts">
	import { onMount } from 'svelte';
	import { THEMES } from '../util/themes';
	import { colorTheme } from '../stores';

	export let pos = { x: 0, y: 0 };

	$: spritePath = THEMES.find((theme) => theme.id === $colorTheme)?.spritePath ?? '_torch/sprites.png';

	const names = [
		'T1011',
		'T1012',
		'T1013',
		'T1014',
		'T1015',
		'T1016',
		'T1017',
		'T1018',
		'T1019',
		'T1020'
	];

	let current = 0;
	$: name = names[current];

	onMount(() => {
		const interval = setInterval(() => {
			current = (current + 1) % names.length;
		}, 100);

		return () => clearInterval(interval);
	});
</script>

<div
	data-sevenup="{name}.png"
	style="transform: translate({pos.x}px,{pos.y}px); background-image: url({spritePath});"
/>

<style>
	[data-sevenup] {
		background-size: 1062px 926px;
	}
	[data-sevenup='T1011.png'] {
		width: 177px;
		height: 463px;
		background-position: 0px 0px;
	}
	[data-sevenup='T1012.png'] {
		width: 177px;
		height: 463px;
		background-position: -177px 0px;
	}
	[data-sevenup='T1013.png'] {
		width: 177px;
		height: 463px;
		background-position: -354px 0px;
	}
	[data-sevenup='T1014.png'] {
		width: 177px;
		height: 463px;
		background-position: -531px 0px;
	}
	[data-sevenup='T1015.png'] {
		width: 177px;
		height: 463px;
		background-position: -708px 0px;
	}
	[data-sevenup='T1016.png'] {
		width: 177px;
		height: 463px;
		background-position: -885px 0px;
	}
	[data-sevenup='T1017.png'] {
		width: 177px;
		height: 463px;
		background-position: 0px -463px;
	}
	[data-sevenup='T1018.png'] {
		width: 177px;
		height: 463px;
		background-position: -177px -463px;
	}
	[data-sevenup='T1019.png'] {
		width: 177px;
		height: 463px;
		background-position: -354px -463px;
	}
	[data-sevenup='T1020.png'] {
		width: 177px;
		height: 463px;
		background-position: -531px -463px;
	}
</style>
