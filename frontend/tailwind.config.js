/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the path for your React project
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.25)',
        md: '2px 2px 4px rgba(0, 0, 0, 0.25)',
        lg: '3px 3px 6px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        primary: '#2C5FDF',
        secondary: '#2A3644',
        Sky: '#D7EAFF',
        Mint: '#48A9A6',
        OffWhite: '#F8F9FA',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
