<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="w-screen h-screen flex flex-col justify-center items-center gap-4 font-vt323">
	<h1 class="font-bold text-2xl">{page.status}: Lost in the woods</h1>
	<a href="/" class="text-accent-300 text-xl">Go back home</a>
</div>
