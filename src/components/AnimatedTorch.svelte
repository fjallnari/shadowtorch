<script lang="ts">
	import { onMount } from 'svelte';
	import { THEMES } from '../util/themes';
	import { colorTheme } from '../stores';

	const SPRITES = [
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
	
	let x = $state(0);
	let y = $state(0);
	let current = $state(0);
	

	let spritePath = $state(THEMES.find(
		(theme) => theme.id === $colorTheme)?.spritePath ?? '_torch/sprites.png'
	);

	let name = $derived(SPRITES[current]);

	onMount(() => {
		const interval = setInterval(() => {
			current = (current + 1) % SPRITES.length;
		}, 100);

		return () => clearInterval(interval);
	});
</script>

<div
	data-sevenup="{name}.png"
	style="transform: translate({x}px,{y}px); background-image: url({spritePath});"
></div>

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
