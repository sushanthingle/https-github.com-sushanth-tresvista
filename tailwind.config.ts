import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: '#07122B', dark: '#030B1A', light: '#0D2460' },
        tvblue:  { DEFAULT: '#1B4FBE', light: '#2E78E8', bright: '#4A9AF5', muted: '#1A3A8C' },
        tvorange:{ DEFAULT: '#EF8014', light: '#FAA34A', muted: '#C96800' },
        slate:   { DEFAULT: '#64748B', light: '#94A3B8', dark: '#334155' },
        surface: { DEFAULT: '#F4F7FB', dark: '#E8EDF5' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow':    'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
        'pulse-glow':   'pulseGlow 3s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'marquee':      'marquee 30s linear infinite',
        'gradient-x':   'gradientX 8s ease infinite',
      },
      keyframes: {
        'spin-reverse': { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: { '300%': '300%' },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'spring':    'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
export default config
