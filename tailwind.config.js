/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#06130C',
          900: '#0A2015',
          800: '#113322',
          700: '#1B4D35',
          600: '#266B4A',
          500: '#348B61',
          400: '#52B788',
          300: '#74C69D',
          200: '#95D5B2',
          100: '#D8F3DC',
          50: '#F0FDF4',
        },
        mist: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50: '#F8FAFC',
        },
        earth: {
          900: '#382215',
          800: '#543621',
          700: '#734C30',
          600: '#946643',
          500: '#B5825B',
          400: '#C99E7A',
          300: '#DCBEA2',
          200: '#EBDEC8',
          100: '#F5EBE0',
          50: '#FAF6F0',
        },
        sunset: {
          900: '#7C2D12',
          800: '#9A3412',
          700: '#C2410C',
          600: '#EA580C',
          500: '#F97316',
          400: '#FB923C',
          300: '#FDBA74',
          200: '#FED7AA',
          100: '#FFEDD5',
        },
        sky: {
          900: '#0C4A6E',
          800: '#075985',
          700: '#0369A1',
          600: '#0284C7',
          500: '#0EA5E9',
          400: '#38BDF8',
          300: '#7DD3FC',
          200: '#BAE6FD',
          100: '#E0F2FE',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'stitch-sm': '0 2px 10px rgba(59, 36, 24, 0.04)',
        'stitch': '0 10px 30px rgba(59, 36, 24, 0.06)',
        'stitch-lg': '0 20px 40px rgba(59, 36, 24, 0.09)',
        'rose-glow': '0 8px 25px rgba(201, 120, 130, 0.25)',
      },
      animation: {
        'float-slow': 'float 5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
