/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      'md': '790px',
    },
    colors: { 
      black: "#191623;",
      orange: "#FD5D11",
      textwhite : "#fff"
    },
    plugins: [],
  },
};
