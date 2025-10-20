/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0B0F',
        'obsidian-dark': '#05050A',
        'obsidian-light': '#1A1A22',
        gold: '#E6C773',
        'gold-light': '#F5E6B3',
        'gold-dark': '#D4A541',
        platinum: '#E8E8E8',
        'glass-light': 'rgba(255, 255, 255, 0.05)',
        'glass-lighter': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        'tight': '-0.03em',
        'tighter': '-0.05em',
      },
      backdropBlur: {
        'glass': '10px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(230, 199, 115, 0.15)',
        'glow-lg': '0 0 40px rgba(230, 199, 115, 0.2)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'glass-lg': '0 8px 64px 0 rgba(31, 38, 135, 0.15)',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in',
        slideUp: 'slideUp 0.5s ease-out',
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

