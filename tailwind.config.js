/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        '370px': '370px',
        '(-310px)': '-310px',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
