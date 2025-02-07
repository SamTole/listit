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
      'dark-purple-1': '#3F3D56',
    },
  },
  plugins: [],
}