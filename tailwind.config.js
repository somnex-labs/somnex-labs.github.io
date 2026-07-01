/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
  ],
  theme: {
    extend: {
      colors: {
        // Somnex gradient palette
        'grad-1': '#e8884f',   // warm amber, bottom-left
        'grad-2': '#d68468',   // coral blush
        'grad-3': '#a97c8d',   // dusty mauve, center
        'grad-4': '#6f7fa0',   // slate violet
        'grad-5': '#4877a3',   // steel blue, top-right
        
        // Text colors
        'text-gradient': '#fffaf6',
        'text-gradient-soft': 'rgba(255, 250, 246, 0.78)',
        'text-dark': '#322823',
        'text-dark-bold': '#1d1612',
        
        // Panel colors
        'panel-bg': 'rgba(255, 252, 248, 0.62)',
        'panel-bg-strong': 'rgba(255, 252, 248, 0.8)',
        'panel-border': 'rgba(255, 255, 255, 0.55)',
        'footer-bg': 'rgba(255, 250, 245, 0.88)',
        'footer-divider': 'rgba(58, 47, 41, 0.18)',
      },
      fontFamily: {
        'title': ['Helios Extended', 'sans-serif'],
        'body': ['Helios Extended', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-somnex': 'linear-gradient(132deg, #e8884f 0%, #d68468 24%, #a97c8d 48%, #6f7fa0 72%, #4877a3 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'gradient-slide': 'gradientSlide 12s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientSlide: {
          '0%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
