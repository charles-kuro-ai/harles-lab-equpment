/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './assets/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#102B46',
          50: '#E8EFF5',
          100: '#C5D5E4',
          200: '#8AACC4',
          300: '#4F82A3',
          400: '#2A5878',
          500: '#102B46',
          600: '#0D2337',
          700: '#0A1B2A',
          800: '#07131D',
          900: '#040A10',
        },
        teal: {
          DEFAULT: '#167D9A',
          50: '#E6F4F8',
          100: '#BFE3EC',
          200: '#80C7D9',
          300: '#40ABC6',
          400: '#208FB0',
          500: '#167D9A',
          600: '#11637A',
          700: '#0C4A5B',
          800: '#08313D',
          900: '#04191E',
        },
        slate: {
          bg: '#F4F7FA',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(16, 43, 70, 0.06), 0 1px 2px -1px rgba(16, 43, 70, 0.04)',
        'card-hover': '0 4px 12px 0 rgba(16, 43, 70, 0.10), 0 2px 4px -1px rgba(16, 43, 70, 0.06)',
        'nav': '0 1px 0 0 #E2E8F0',
      },
    },
  },
  plugins: [],
}
