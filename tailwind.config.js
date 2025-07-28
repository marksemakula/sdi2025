/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Marcellus', 'serif'], // Changed to Marcellus
        cinzel: ['Cinzel', 'serif'],
        marcellus: ['Marcellus', 'serif'], // Added Marcellus
      },
      colors: {
        primary: '#74C365',
        secondary: '#FF5F1F',
        tertiary: '#0F52BA',
        lightgray: '#ECECEC',
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
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
      }
    },
  },
  plugins: [],
}