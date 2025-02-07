/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '2px': '2px',
        '3px': '3px',
        '30rem': '30rem',
        '42rem': '42rem',
      },
    },
    colors: {
      'white': '#FFF',
      'light-purple-1': '#6C63FF',
      'light-purple-2': '#E1DFFF',
      'dark-purple-1': '#3F3D56',
      'dark-purple-2': '#534CC7',
      'gray-1': '#888888',
      'gray-2': '#A0A0A0',
    },
  },
  plugins: [],
}