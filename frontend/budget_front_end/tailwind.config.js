/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  themes: {
    themes: ["customTheme"],
  },
  daisyui: {
    themes: [
      {
        customTheme: {
          primary: "0B406F", //darkest blue
          "primary-content": "D6F3FF", // lightest blue
          secondary: "0078D7", //medium blue of header buttons
          "secondary-content": "ffffff", // lightest blue
          accent: "7CC6FD", //second lightest blue of selected
          "base-300": "1A202C", //darkest blue
          neutral: "#48d1ff",
          error: "#ff4d4d",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
