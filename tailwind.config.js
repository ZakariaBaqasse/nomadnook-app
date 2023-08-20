/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#193A4F",
        secondary: "#E2C17C",
        teal: "#45B5AA",
        gray: {
          light: "#F4F4F4",
          dark: "#333333",
        },
      },
      fontFamily: {
        primary: "Playfair Display",
        secondary: "Open Sans",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin")],
};
