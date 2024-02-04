/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar"
export default {
  content: ["src/index.html", "src/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
        upload: {
          "0%": {
            transform: "translate(0,110%)",
          },
          "50%": {
            transform: "translate(0,0)",
          },
          "100%": {
            transform: "translate(0,-110%)",
          },
        },
      },
    },
  },
  plugins: [tailwindScrollbar],
  darkMode: "class",
}
