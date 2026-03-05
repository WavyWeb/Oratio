/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f59e0b", // amber-500
        secondary: "#e11d48", // rose-600
        accent: "#fb923c", // orange-400
        neutral: "#f1f5f9", // slate-100
        background: "#ffffff", // white
        lighttext: "#020617", // slate-950 (dark text for light bg)
        darktext: "#f8fafc", // slate-50 (light text for dark elements)
      },
      animation: {
        blob: "blob 7s infinite",
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-in": "slideIn 0.6s ease-in-out",
        glow: "glow 3s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(45, 212, 191, 0.3), 0 0 30px rgba(96, 165, 250, 0.1)"
          },
          "50%": {
            boxShadow: "0 0 25px rgba(45, 212, 191, 0.5), 0 0 40px rgba(96, 165, 250, 0.2)"
          },
        },
      },
      backdropFilter: {
        none: "none",
        blur: "blur(12px)",
      },
    },
  },
  plugins: [],
};
