/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.06)',
      },
      backdropBlur: {
        xs: '4px',
      }
    },
  },
  plugins: [],
}
