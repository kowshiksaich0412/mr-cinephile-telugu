/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0f0f0f",
          red: "#e50914",
          gray: "#1f1f1f"
        }
      },
      boxShadow: {
        glow: "0 10px 30px rgba(229, 9, 20, 0.35)"
      }
    }
  },
  plugins: []
};
