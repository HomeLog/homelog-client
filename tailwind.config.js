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
  theme: {
    extend: {
      aspectRatio: {
        '3/4': '3 / 4',
        '2/3': '2 / 3',
      },
      backgroundImage: {
        'paper-texture': "url('/images/paper.jpg')",
      },
      fontFamily: {
        'digital-clock': ['E1234', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': scrollbarHide,
      };
      addUtilities(newUtilities);
    },
  ],
};
