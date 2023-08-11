/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
    },
  },
  plugins: [],
};

