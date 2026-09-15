/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#090d16',
          card: '#0f172a',
          border: '#1e293b',
          accent: '#00f2fe',
          teal: '#4facfe',
          green: '#10b981',
          yellow: '#f59e0b',
          red: '#ef4444'
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'cyber-glow': '0 0 25px -5px rgba(0, 242, 254, 0.25)',
        'cyber-red': '0 0 25px -5px rgba(239, 68, 68, 0.25)',
        'cyber-green': '0 0 25px -5px rgba(16, 185, 129, 0.25)'
      }
    },
  },
  plugins: [],
}
