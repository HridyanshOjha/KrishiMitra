/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        display: ['"DM Serif Display"', 'serif'],
      },
      colors: {
        brand: {
          50:  '#f0faf0',
          100: '#dcf5dc',
          200: '#b5e8b5',
          300: '#7dd47d',
          400: '#4ab84a',
          500: '#2d8c2d',
          600: '#236e23',
          700: '#1c561c',
          800: '#174417',
          900: '#113511',
          950: '#081f08',
        },
        earth: {
          50:  '#faf7f2',
          100: '#f0e9d8',
          200: '#dfd0b0',
          300: '#c8b082',
          400: '#b0905a',
          500: '#9a7740',
          600: '#7d5f30',
          700: '#634a26',
          800: '#503c21',
          900: '#3f301c',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.3s ease forwards',
        'slide-in': 'slideIn 0.3s ease forwards',
        'scale-in': 'scaleIn 0.2s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0,0,0,0.06)',
        'medium': '0 4px 20px rgba(0,0,0,0.10)',
        'strong': '0 8px 40px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
