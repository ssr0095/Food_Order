/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        outfit: "Outfit",
      },
      backgroundImage: {
        hero: "url('/header_img.png')",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(25%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1.5s",
      },
      gridTemplateColumns: {
        foods: "repeat(auto-fill, minmax(240px, 1fr))",
        cart: "1fr 1.5fr 1fr 0.8fr 1fr 0.5fr",
        order: "0.5fr 1.7fr 0.5fr 0.5fr 0.8fr 0.8fr",
      },
      colors: {
        tomato: "#ff4c24",
        "tomato-hov": "#fb603e",
        pop: "#00000054",
      },
      plugins: [],
    },
  },
};
