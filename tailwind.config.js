/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Natural theme colors
        background: 'oklch(0.98 0.01 120)',
        foreground: 'oklch(0.15 0.02 140)',
        primary: {
          DEFAULT: 'oklch(0.45 0.18 140)',
          foreground: 'oklch(0.98 0.01 120)',
        },
        secondary: {
          DEFAULT: 'oklch(0.95 0.01 120)',
          foreground: 'oklch(0.25 0.02 140)',
        },
        accent: {
          DEFAULT: 'oklch(0.55 0.15 180)',
          foreground: 'oklch(0.98 0.01 120)',
        },
        muted: {
          DEFAULT: 'oklch(0.96 0.01 120)',
          foreground: 'oklch(0.55 0.02 140)',
        },
        border: 'oklch(0.92 0.01 120)',
        input: 'oklch(0.92 0.01 120)',
        ring: 'oklch(0.45 0.18 140)',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

