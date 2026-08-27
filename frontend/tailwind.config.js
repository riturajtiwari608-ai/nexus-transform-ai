/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090d16",
        surface: "#0f172a",
        surfaceCard: "#1e293b",
        border: "#334155",
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        process: "#38bdf8", // Sky blue
        role: "#10b981",    // Emerald green
        skill: "#f59e0b",   // Amber
        agent: "#a855f7",   // Purple
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))' },
          '50%': { opacity: '0.7', filter: 'drop-shadow(0 0 2px rgba(168, 85, 247, 0.2))' },
        }
      }
    },
  },
  plugins: [],
}
