/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        twitter: {
          100: "#06141d",
          200: "#1b2730",
          300: "#1da1f2",
          400: "#a8b7be",
          500: "#2a3843",
          myProfile: "#1b2730",
          text1: "#dee7e9",
          text2: "#65727f",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
