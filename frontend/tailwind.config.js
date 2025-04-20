/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",             
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F7A1F',  // deep green
        accent: '#F7C948',   // warm yellow
      },
    },
  },
  plugins: [],
}

