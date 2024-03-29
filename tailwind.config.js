/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'light-white': '#fafafa',
      'flag-test': "#34d399",
      'dark-blue' : "hsl(209, 23%, 22%)",
      'very-dark-blue' : "hsl(207, 26%, 17%)",
      'very-dark-blue-text' : "hsl(200, 15%, 8%)",
      'dark-gray' : "hsl(0, 0%, 52%)",
      'very-light-gray-bg' : "hsl(0, 0%, 98%)",
      
    }
  },
  plugins: [],
}

