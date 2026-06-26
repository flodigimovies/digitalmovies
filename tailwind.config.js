module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: "#141414",          // Netflix main background
        "nf-card": "#1a1a1a",     // Card / surface background
        "nf-hover": "#2a2a2a",    // Card hover state
        "nf-border": "#2a2a2a",   // Subtle borders
        "nf-muted": "#a3a3a3",    // Secondary text
      }
    },
  },
  plugins: [],
}