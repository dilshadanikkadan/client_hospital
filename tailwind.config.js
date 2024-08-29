/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FBFBFB",
        secondary: "#202D57",
        info: "#1C6BA6",
      },
      fontFamily: {
        logo: ["Lexend", "sans-serif"],
        desc: ["Manrope", "sans-serif"],
        info: ["Questrial", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      width: ["responsive"],
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("daisyui")],
};
