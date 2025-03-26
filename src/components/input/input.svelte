<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { type InputEvents, inputVariants, type Variant } from "./index.js";
	import { cn } from "../../util/util.js";

	type $$Props = HTMLInputAttributes & { variant: Variant };
	type $$Events = InputEvents;


	export let value: $$Props["value"] = undefined;
	export let variant: $$Props["variant"] = "default";

	// Workaround for https://github.com/sveltejs/svelte/issues/9305
	// Fixed in Svelte 5, but not backported to 4.x.
	export let readonly: $$Props["readonly"] = undefined;

	const focus = (element: any) => {
		element.focus();
	};
</script>

<input
	class={cn(inputVariants({ variant }))}
	bind:value
	{readonly}
	on:blur
	on:change
	on:click
	on:focus
	on:focusin
	on:focusout
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:paste
	on:input
	on:wheel|passive
	{...$$restProps}
	use:focus
/>
