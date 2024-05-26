const scrollbarHide = {
  '-ms-overflow-style': 'none', // IE and Edge
  'scrollbar-width': 'none', // Firefox
  '&::-webkit-scrollbar': {
    display: 'none', // Safari and Chrome
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': scrollbarHide,
      };
      addUtilities(newUtilities);
    },
  ],
};
