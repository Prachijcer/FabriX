/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          navy: '#0f172a',
          purpleGradientStart: '#6366f1',
          purpleGradientEnd: '#7c3aed'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'glass': '0 20px 40px -15px rgba(99, 102, 241, 0.12), 0 0 15px rgba(0, 0, 0, 0.03)',
        'glass-hover': '0 30px 60px -12px rgba(99, 102, 241, 0.22), 0 0 25px rgba(0, 0, 0, 0.05)',
        'soft': '0 10px 30px rgba(15, 23, 42, 0.05)'
      }
    },
  },
  plugins: [],
}
