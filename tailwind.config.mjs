/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    container: {
      center: true,
      padding: "1rem",
    },
		extend: {
      colors: {
        "brand-black": "#0a0a0a",
        "brand-gray": "#e4f1f1",
      }
    },
	},
	plugins: [
    require('tailwindcss-animated')
  ],
}
