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
				'renobo-green': {
					DEFAULT: 'rgb(var(--renobo-green) / <alpha-value>)',
					light: 'rgb(var(--renobo-green-light) / <alpha-value>)',
					lighter: 'rgb(var(--renobo-green-lighter) / <alpha-value>)',
					lightest: 'rgb(var(--renobo-green-lightest) / <alpha-value>)',
					bg: 'rgb(var(--renobo-green-bg) / <alpha-value>)'
				}
			},
			backgroundColor: {
				'surface': 'rgb(var(--renobo-surface) / <alpha-value>)',
				'surface-dark': 'rgb(var(--renobo-surface-dark) / <alpha-value>)'
			},
			borderRadius: {
				'renobo': '12px',
				'renobo-lg': '16px',
				'renobo-xl': '20px'
			},
			fontFamily: {
				inter: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				display: ['Space Grotesk', 'system-ui', '-apple-system', 'sans-serif']
			},
			boxShadow: {
				'renobo-sm': '0 1px 2px 0 rgba(18, 74, 38, 0.05)',
				'renobo-md': '0 4px 6px -1px rgba(18, 74, 38, 0.1), 0 2px 4px -1px rgba(18, 74, 38, 0.06)',
				'renobo-lg': '0 10px 15px -3px rgba(18, 74, 38, 0.1), 0 4px 6px -2px rgba(18, 74, 38, 0.05)',
				'renobo-xl': '0 20px 25px -5px rgba(18, 74, 38, 0.1), 0 10px 10px -5px rgba(18, 74, 38, 0.04)'
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
