/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  important: '#__next',
  theme: {},
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
