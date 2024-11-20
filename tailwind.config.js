/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{html,ejs}", // Adjust the path based on where your views are stored
    "./public/**/*.{html,js,css}", // Include public files if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};