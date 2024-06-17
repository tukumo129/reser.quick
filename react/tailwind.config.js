/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        base: "#FAF29B",
        hover: "#FFFBCC",
        push: "#A19E7F",
        fontBase: "#000000",
        fontPush: "#FFFFFF",
        subMain: "#B0E6F2",
        backColor: "#EFEFEF",
        borderColor: "#848484",
      },
    },
  },
  plugins: [],
};
