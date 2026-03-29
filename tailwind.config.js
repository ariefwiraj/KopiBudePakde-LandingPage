/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#AC402B',   // Terracotta
          hover: '#8B3322',     // Deep Rust
          bgMain: '#FDFBF7',    // Oat Milk
          bgCard: '#FFFFFF',    // Pure White
          text: '#2A1B18',      // Dark Espresso
          muted: '#7A665D',     // Mocha Ash
          accent: '#E88D67'     // Soft Clay
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
