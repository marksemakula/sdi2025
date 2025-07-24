/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
      colors: {
        primary: '#74C365',
        secondary: '#FF5F1F',
        tertiary: '#0F52BA',
        lightgray: '#ECECEC', // Added light gray color
      },
      borderColor: {
        DEFAULT: '#e5e7eb',
      },
      backgroundSize: {
        'cover': 'cover',
      },
      backgroundPosition: {
        'center': 'center',
      },
      screens: {
        'xs': '480px',
      },
      // ADDED: Animation keyframes
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      // ADDED: Animation classes
      animation: {
        scroll: 'scroll 30s linear infinite',
      }
    },
  },
  plugins: [],
}