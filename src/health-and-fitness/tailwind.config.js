/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        custom: "0px 4px 4px rgba(165, 133, 133, 0.75)",
      },
    },
  },
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-custom": {
          textShadow: "0px 4px 4px rgba(165, 133, 133, 0.75)",
        },
      });
    },
  ],
};
