/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        btnprimary: "#34495E",
        textblack: "#191D32",
      }
    },
  },
  plugins: [require("daisyui")],
};
