/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070d",
        surface: {
          DEFAULT: "#0b101c",
          subtle: "#101728",
          card: "#0e1424",
          border: "rgba(212, 175, 55, 0.22)"
        },
        gold: {
          DEFAULT: "#d4af37",
          light: "#fce49c",
          bright: "#f59e0b",
          amber: "#e5a93b",
          bronze: "#b38728",
          dark: "#784e10",
          glow: "rgba(212, 175, 55, 0.45)"
        },
        platinum: {
          DEFAULT: "#e2e8f0",
          light: "#f8fafc",
          muted: "#94a3b8",
          dark: "#334155"
        },
        papyrus: {
          DEFAULT: "#e8dfd1",
          dark: "#c4b39b"
        },
        cyan: {
          electric: "#00f0ff",
          muted: "#0284c7"
        },
        blueprint: {
          grid: "rgba(212, 175, 55, 0.06)",
          line: "rgba(212, 175, 55, 0.25)",
          text: "#fce49c"
        }
      },
      fontFamily: {
        mono: ['"Poppins"', '"JetBrains Mono"', 'monospace'],
        display: ['"Poppins"', 'sans-serif'],
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
        tech: ['"Poppins"', 'sans-serif']
      },
      backgroundImage: {
        'gold-grid': 'linear-gradient(to right, rgba(212, 175, 55, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 175, 55, 0.05) 1px, transparent 1px)',
        'cyan-grid': 'linear-gradient(to right, rgba(0, 240, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.04) 1px, transparent 1px)',
        'gold-gradient': 'linear-gradient(135deg, #fce49c 0%, #d4af37 50%, #946f1b 100%)',
        'platinum-gradient': 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%)',
      },
      backgroundSize: {
        'grid-sm': '20px 20px',
        'grid-md': '40px 40px',
        'grid-lg': '80px 80px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 25s linear infinite',
        'spin-reverse': 'spinReverse 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.8))' }
        }
      }
    },
  },
  plugins: [],
}
