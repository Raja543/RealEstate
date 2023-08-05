/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'custom': ['Albert Sans', 'sans-serif'],
  },
    screens: {
      'sm': '640px',
      'md': '865px',
      'lg': '1024px', 
      'xl': '1280px',

    },
    backgroundImage: {
      'hero-lg': "url('/images/cbg.jpg')",
  },
    colors: { 
      black: "#191623;",
      orange: "#FD5D11",
      textwhite : "#fff"
    },
    plugins: [],
  },
};
