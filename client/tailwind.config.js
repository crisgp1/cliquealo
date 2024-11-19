/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-footer': '#174C9B', // Color azul personalizado del footer
      },
    },
   
  },
  plugins: [],
}