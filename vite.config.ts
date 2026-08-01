import { fileURLToPath } from 'node:url';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

// TARGET=android picks the bundled-TTF font source for the Capacitor build;
// anything else picks the Google Fonts CDN source for the web build
const fontVariant = process.env.TARGET === 'android' ? 'android' : 'web';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			'virtual:vt323-font': fileURLToPath(new URL(`./src/lib/fonts/${fontVariant}.css`, import.meta.url))
		}
	},
	test: {
		include: ['src/**/*.test.ts'],
		environment: 'node'
	}
});
