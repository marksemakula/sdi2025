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
      },
      colors: {
        primary: '#74C365',
        secondary: '#FF5F1F',
        tertiary: '#0F52BA',
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
        'xs': '480px', // Add extra small breakpoint if needed
      },
    },
  },
  plugins: [],
}