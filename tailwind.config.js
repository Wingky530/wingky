/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#EBEBDF',
        primary: '#191265',
      },
    },
  },
  plugins: [],
}