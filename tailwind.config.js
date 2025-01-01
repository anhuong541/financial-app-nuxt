/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        coral: {
          400: "#ff8a65",
          500: "#ff7043",
          600: "#f4511e",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
