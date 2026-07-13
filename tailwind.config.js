/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#03110d',
        'ink-soft': '#071713',
        graphite: '#16211d',
        electric: {
          DEFAULT: '#38bdf8',
          soft: '#7dd3fc',
          deep: '#0ea5e9'
        },
        emerald: {
          DEFAULT: '#34d399',
          soft: '#6ee7b7',
          deep: '#10b981'
        }
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Manrope', 'sans-serif']
      },
      boxShadow: {
        'glow-blue':
          '0 0 0 1px rgba(56, 189, 248, 0.10), 0 24px 90px rgba(14, 165, 233, 0.18)',
        'glow-emerald':
          '0 0 0 1px rgba(52, 211, 153, 0.12), 0 24px 90px rgba(16, 185, 129, 0.16)'
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 38%), radial-gradient(circle at 85% 20%, rgba(52, 211, 153, 0.14), transparent 30%)',
        'panel-grid':
          'linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        pulseGrid: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.7' }
        }
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'pulse-grid': 'pulseGrid 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
