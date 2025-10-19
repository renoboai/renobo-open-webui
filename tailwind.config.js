import typography from '@tailwindcss/typography';
import containerQuries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#e6f7f2',
					100: '#ccefe5',
					200: '#99dfcb',
					300: '#66cfb1',
					400: '#33bf97',
					500: '#00A676',
					600: '#00855e',
					700: '#007D63',
					800: '#005340',
					900: '#003a2d',
					950: '#00261f'
				},
				gray: {
					50: 'var(--color-gray-50, #f9f9f9)',
					100: 'var(--color-gray-100, #ececec)',
					200: 'var(--color-gray-200, #e3e3e3)',
					300: 'var(--color-gray-300, #cdcdcd)',
					400: 'var(--color-gray-400, #b4b4b4)',
					500: 'var(--color-gray-500, #9b9b9b)',
					600: 'var(--color-gray-600, #676767)',
					700: 'var(--color-gray-700, #4e4e4e)',
					800: 'var(--color-gray-800, #333)',
					850: 'var(--color-gray-850, #262626)',
					900: 'var(--color-gray-900, #171717)',
					950: 'var(--color-gray-950, #0d0d0d)'
				},
				background: {
					DEFAULT: '#F7F9F9',
					dark: '#1B263B'
				},
				text: {
					DEFAULT: '#1B263B',
					light: '#F7F9F9'
				},
				accent: {
					DEFAULT: '#E0FBFC',
					50: '#f0feff',
					100: '#e0fbfc',
					200: '#c2f7f9',
					300: '#a3f3f6',
					400: '#85eff3',
					500: '#66ebf0',
					600: '#48d4d8',
					700: '#3ab0b4',
					800: '#2c8c8f',
					900: '#1e686a'
				}
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
