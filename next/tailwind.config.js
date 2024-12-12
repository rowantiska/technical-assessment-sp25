/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',  // Ensure `app` folder is included
    './src/comps/**/*.{js,ts,jsx,tsx}', // Add your `comps` folder
    './src/pages/**/*.{js,ts,jsx,tsx}', // Add your `comps` folder

  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
