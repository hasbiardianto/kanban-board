import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#01959f",
        blue: "#4DB5BC",
        orange: "#FA9810",
        red: "#E11428",
        green: "#43936C",
        bg: {
          blue: "#F7FEFF",
          orange: "#FFFCF5",
          red: "#FFFAFA",
          green: "#F8FBF9",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('progress-unfilled', ['&::-webkit-progress-bar', '&']);
      addVariant('progress-filled', ['&::-webkit-progress-value', '&::-moz-progress-bar', '&']);
    })
  ]
};
export default config;
