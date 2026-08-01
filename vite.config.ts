import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
	// '' prefix = load ALL env vars (incl. non-VITE_), so LIGHTS_ENABLED/HA_* resolve from .env
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: [tailwindcss(), sveltekit()],
		define: {
			'import.meta.env.LIGHTS_ENABLED': JSON.stringify(env.LIGHTS_ENABLED === 'true')
		},
		test: {
			include: ['src/**/*.test.ts'],
			environment: 'node'
		}
	};
});
