/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1.25rem',
				lg: '2rem',
				xl: '3rem'
			}
		},
		extend: {
			colors: {
				paper: '#f5f2ed',
				ink: '#090909',
				graphite: '#151515',
				tone: '#d6d1c4',
				accent: '#ff2b4c',
				accentMuted: '#ff7a92'
			},
			fontFamily: {
				sans: ['"Space Grotesk"', 'sans-serif'],
				display: ['"Bebas Neue"', 'cursive'],
				mono: ['"IBM Plex Mono"', 'monospace']
			},
			boxShadow: {
				panel: '12px 12px 0 0 rgba(0,0,0,0.85)',
				divider: '0 25px 50px -12px rgba(0,0,0,0.35)'
			},
			backgroundImage: {
				halftone: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
				'speed-lines': 'linear-gradient(115deg, rgba(255,255,255,0.12) 10%, transparent 45%)',
				'paper-fiber': 'linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 0)'
			},
			keyframes: {
				'panel-rise': {
					'0%': { transform: 'translateY(40px) scale(0.97)', opacity: '0' },
					'70%': { transform: 'translateY(-4px) scale(1.02)', opacity: '1' },
					'100%': { transform: 'translateY(0) scale(1)', opacity: '1' }
				},
				scribble: {
					'0%': { clipPath: 'inset(0 100% 0 0)' },
					'45%': { clipPath: 'inset(0 0 0 0)' },
					'100%': { clipPath: 'inset(0 0 0 0)' }
				},
				'scan-lines': {
					'0%': { backgroundPosition: '0 0' },
					'100%': { backgroundPosition: '0 100%' }
				},
				'float-ink': {
					'0%,100%': { transform: 'translate3d(0, 0, 0)' },
					'50%': { transform: 'translate3d(10px, -14px, 0)' }
				},
				'burst-in': {
					'0%': { transform: 'scale(0.7) rotate(-6deg)', opacity: '0' },
					'100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
				}
			},
			animation: {
				'panel-rise': 'panel-rise 0.9s cubic-bezier(0.19, 1, 0.22, 1) forwards',
				scribble: 'scribble 1.2s steps(3, end) forwards',
				'scan-lines': 'scan-lines 8s linear infinite',
				'float-ink': 'float-ink 7s ease-in-out infinite',
				'burst-in': 'burst-in 0.8s ease-out forwards'
			}
		}
	},
	plugins: []
};
