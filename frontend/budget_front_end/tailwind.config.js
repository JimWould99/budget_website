/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  themes: {
    themes: ["lemonade"],
  },
  daisyui: {
    themes: [
      {
        lemonade: {
          ...require("daisyui/src/theming/themes")["lemonade"],
          error: "#880808",
          warning: "#FFBF00",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
