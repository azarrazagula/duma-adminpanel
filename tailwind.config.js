/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#f4f7fe', // Redefined bg-dark for fast transition to light
          card: '#ffffff',
          hover: '#f1f5f9',
        },
        accent: {
          primary: '#4318FF',
          secondary: '#39B8FF',
          pink: '#E31A1A',
        },
        slate: {
          primary: '#1B254B',
          secondary: '#A3AED0',
        }
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #4318FF 0%, #39B8FF 100%)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      borderWidth: {
        '1': '1px',
      },
      borderColor: {
        'glass': '#E2E8F0', // Redefined for light theme
      }
    },
  },
  plugins: [],
}
