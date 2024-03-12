/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: false,
    extend: {
      colors: {
        "brand-black": "#0a0a0a",
        "brand-red": "#da0c16",
        "brand-gray": "#e4f1f1",
        "brand-lightblue": "#e3f7f7",
      },
      fontFamily: {
        "gothic-716": ["unit-gothic-716", "sans-serif"],
        "gothic-717": ["unit-gothic-717", "sans-serif"],
        "gothic-718": ["unit-gothic-718", "sans-serif"],
        "gothic-719": ["unit-gothic-719", "sans-serif"],
        "gothic-720": ["unit-gothic-720", "sans-serif"],
        "gothic-721": ["unit-gothic-721", "sans-serif"],
        "gothic-722": ["unit-gothic-722", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
