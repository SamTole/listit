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
        '35rem': '35rem',
        '42rem': '42rem',
      },
    },
    borderWidth: {
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
    },
    colors: {
      'white': '#FFF',
      'light-purple-1': '#6C63FF',
      'light-purple-2': '#E1DFFF',
      'light-purple-3': '#827CF1',
      'light-purple-4': '#D2CFFF',
      'light-purple-5': '#BDB9FF',
      'light-purple-6': '#F6F5FF',
      'dark-purple-1': '#3F3D56',
      'dark-purple-2': '#534CC7',
      'gray-1': '#888888',
      'gray-2': '#A0A0A0',
      'gray-3': '#D9D9D9',
      'gray-4': '#9B9B9B',
      'gray-5': '#474747',
      'gray-6': '#F9F9F9',
      'gray-7': '#878787',
      'red-1': '#FF6363',
      'red-category': '#EC585A',
      'orange-category': '#F9B555',
      'yellow-category': '#FBD147',
      'green-category': '#63B962',
      'blue-category': '#4DA5D0',
      'purple-category': '#6C63FF',
      'pink-category': '#EF84BB',
    },
  },
  plugins: [],
}