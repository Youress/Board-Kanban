/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'bl': '#1d1f26',
      },
      fontFamily: {
        sans: ['"Lato", sans-serif'],
      },
    },
  },
  plugins: [],
}
