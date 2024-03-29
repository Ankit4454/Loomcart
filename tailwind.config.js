/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        lightTeal: '#d1fffa22',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtility = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
        },
        ".star": {
          "color": "gray",
          "cursor": "pointer",
        },
        ".star.filled": {
          "color": "yellow",
        },
        ".hide-arrow": {
          "&::-webkit-inner-spin-button": {
            "-webkit-appearance": 'none',
            "margin": "0"
          },
          '&::-webkit-outer-spin-button': {
            "-webkit-appearance": 'none',
            "margin": "0"
          },
        }
      };
      addUtilities(newUtility);
    }
  ],
}

