import { fileURLToPath } from 'node:url';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

// TARGET=android picks the bundled-TTF font source for the Capacitor build;
// anything else picks the Google Fonts CDN source for the web build
const fontVariant = process.env.TARGET === 'android' ? 'android' : 'web';

export default defineConfig(({ mode }) => {
	// '' prefix = load ALL env vars (incl. non-VITE_), so LIGHTS_ENABLED/HA_* resolve from .env
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: [tailwindcss(), sveltekit()],
		define: {
			'import.meta.env.LIGHTS_ENABLED': JSON.stringify(env.LIGHTS_ENABLED === 'true')
		},
		resolve: {
			alias: {
				'virtual:vt323-font': fileURLToPath(new URL(`./src/lib/fonts/${fontVariant}.css`, import.meta.url))
			}
		},
		test: {
			include: ['src/**/*.test.ts'],
			environment: 'node'
		}
	};
});
