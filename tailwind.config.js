/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				vt323: ['VT323', 'serif']
			},
			colors: {
				accent: {
					300: 'var(--clr-accent-300)',
					500: 'var(--clr-accent-500)',
					950: 'var(--clr-accent-950)'
				}
			}
		}
	},
	plugins: []
};
