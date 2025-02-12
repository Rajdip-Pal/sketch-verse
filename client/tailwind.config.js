/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      kotta: ['Kotta One', 'serif'],
      kumar: ['Kumar One', 'cursive'],
      nixie: ['Nixie One', 'cursive'],
    },
  },
  },
  plugins: [],
}

