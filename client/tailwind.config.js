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
      'light-purple-3': '#827CF1',
      'light-purple-4': '#D2CFFF',
      'light-purple-5': '#BDB9FF',
      'dark-purple-1': '#3F3D56',
      'dark-purple-2': '#534CC7',
      'gray-1': '#888888',
      'gray-2': '#A0A0A0',
      'gray-3': '#D9D9D9',
      'gray-4': '#9B9B9B',
      'gray-5': '#474747',
      'red-1': '#FF6363',
      'orange-1': '#FFA04D',
      'yellow-1': '#FBD147',
      'green-1': '#44B061',
      'blue-1': '#5294F0',
    },
  },
  plugins: [],
}