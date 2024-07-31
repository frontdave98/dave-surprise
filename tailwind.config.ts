import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "0.5rem",
        md: "3rem",
        lg: "1rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [flowbite.plugin()],
  darkMode: "class",
};
export default config;
