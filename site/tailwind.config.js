/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "topBar":"var(--topbar-color)",
        "shadow": "var(--main-text-highlight)",
        "main": "var(--main-color)",
        "accent": "var(--accent)",
        "void": "var(--void)",
        "link": "var(--link-color)"
      },
      fontFamily:{
        'IBM': 'IBM Plex Sans',
        'Ubuntu-Mono' : 'Ubuntu Mono'
      },
      dropShadow:{
        "highlight":'2px 1px 2px var(--main-text-highlight)',
      }
    },
  },
  plugins: [],
};
