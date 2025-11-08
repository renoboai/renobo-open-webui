import typography from '@tailwindcss/typography';
import containerQuries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--renobo-primary) / <alpha-value>)',
				secondary: 'rgb(var(--renobo-secondary) / <alpha-value>)',
				epc: {
					a: 'rgb(var(--epc-a) / <alpha-value>)',
					b: 'rgb(var(--epc-b) / <alpha-value>)',
					c: 'rgb(var(--epc-c) / <alpha-value>)',
					d: 'rgb(var(--epc-d) / <alpha-value>)',
					e: 'rgb(var(--epc-e) / <alpha-value>)',
					f: 'rgb(var(--epc-f) / <alpha-value>)',
					g: 'rgb(var(--epc-g) / <alpha-value>)'
				}
			},
			backgroundColor: {
				'surface': 'rgb(var(--renobo-surface) / <alpha-value>)',
				'surface-dark': 'rgb(var(--renobo-surface-dark) / <alpha-value>)'
			},
			typography: {
				DEFAULT: {
					css: {
						pre: false,
						code: false,
						'pre code': false,
						'code::before': false,
						'code::after': false
					}
				}
			},
			padding: {
				'safe-bottom': 'env(safe-area-inset-bottom)'
			}
		}
	},
	plugins: [typography, containerQuries]
};
