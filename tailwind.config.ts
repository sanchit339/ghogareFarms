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
        primary: '#F4AB25',
        'background-light': '#F8F7F5',
        'background-dark': '#221C10',
        amber:    { DEFAULT: '#F4AB25', light: '#FFD27A', dark: '#D69012' },
        cream:    { DEFAULT: '#F8F7F5', dark: '#FFF8E8' },
        forest:   { DEFAULT: '#221C10', light: '#3B2A00', dark: '#140F08' },
        saffron:  { DEFAULT: '#F4AB25', light: '#FFD27A' },
        earth:    { DEFAULT: '#7A5C00', light: '#9A7600' },
        whatsapp: '#25D366',
        bark:     '#3B2A00',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body:    ['var(--font-mukta)', 'sans-serif'],
        deva:    ['var(--font-mukta)', 'serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.7s ease forwards',
        'fade-in':   'fadeIn 0.6s ease forwards',
        'shimmer':   'shimmer 2s infinite',
        'pulse-wa':  'pulseWa 2s ease-in-out infinite',
        'float':     'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        shimmer:  { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
        pulseWa:  { '0%,100%': { boxShadow: '0 0 0 0 rgba(37,211,102,0.5)' }, '70%': { boxShadow: '0 0 0 12px rgba(37,211,102,0)' } },
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
      },
    },
  },
  plugins: [],
}
export default config
