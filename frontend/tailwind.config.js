/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F7A1F",
        accent: "#F7C948",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        times: ['"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
}

