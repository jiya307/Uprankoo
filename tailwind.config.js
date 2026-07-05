/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            50:  '#FFF0F0',
            100: '#FFD9D9',
            200: '#FFB3B3',
            300: '#FF7373',
            400: '#F53D3D',
            500: '#DC2626',
            600: '#C41E1E',
            700: '#B91C1C',
            800: '#991B1B',
            900: '#7F1D1D',
            950: '#450A0A',
          },
          gold: {
            50:  '#FFFDF0',
            100: '#FFF8D6',
            200: '#FFEEA0',
            300: '#FFE066',
            400: '#F5C842',
            500: '#D4A017',
            600: '#B8860B',
            700: '#92700A',
            800: '#6B5008',
            900: '#4A3805',
          },
        },
        dark: '#0A0A0A',
        charcoal: '#1A1A1A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A0A0A 50%, #2D0D0D 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #D4A017 0%, #F5C842 50%, #D4A017 100%)',
        'red-gold': 'linear-gradient(135deg, #B91C1C 0%, #D4A017 100%)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(196, 30, 30, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(196, 30, 30, 0.8)' },
        },
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(212, 160, 23, 0.35)',
        'red': '0 4px 24px rgba(185, 28, 28, 0.45)',
        'glow-red': '0 0 40px rgba(196, 30, 30, 0.6)',
        'glow-gold': '0 0 40px rgba(212, 160, 23, 0.5)',
      },
    },
  },
  plugins: [],
};
