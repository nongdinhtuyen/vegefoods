/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#82ae46'
      },
      colors: {
        primary: '#82ae46'
      },
      width: {
        modal: 448
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // <== disable this!
  },
}