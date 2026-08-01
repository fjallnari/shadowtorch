import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';

// TARGET=android produces a static build for the Capacitor-wrapped app; anything else (the default)
// produces the Node build used by the Vercel/Docker web deploy.
const adapter = process.env.TARGET === 'android' ? adapterStatic() : adapterNode();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter
	}
};

export default config;
