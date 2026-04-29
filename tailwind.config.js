/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0a0b',
          card: '#151518',
          hover: '#1c1c21',
        },
        accent: {
          primary: '#8b5cf6',
          secondary: '#06b6d4',
          pink: '#d946ef',
        },
        slate: {
          primary: '#f8fafc',
          secondary: '#94a3b8',
        }
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      borderWidth: {
        '1': '1px',
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}
