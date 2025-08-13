/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // We only define the font family and our color palette here.
      // All other styling is handled in globals.css.
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: "#ffffff",
        foreground: "#0f172a",
        card: "#ffffff",
        "card-foreground": "#0f172a",
        muted: "#64748b",
        "muted-foreground": "#64748b",
        border: "#e2e8f0",
        "brand-primary": "#1A237E",
        "brand-secondary": "#5C6BC0",
        "brand-accent": "#D4AF37",
      },
    },
  },
  plugins: [],
};
