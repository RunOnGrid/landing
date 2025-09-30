/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/UltimoFondo.png')",
        homeDesktop:
          "url('https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/5ff49818-c6d5-4f36-32b1-63538def2500/public')",
      },
      // Usamos variables de next/font para evitar FOUT
      fontFamily: {
        sans: ["var(--font-open-sans)", "ui-sans-serif", "system-ui"],
        heading: ["var(--font-montserrat)", "ui-sans-serif", "system-ui"],
      },
      borderRadius: { xl: "1rem", "2xl": "1.5rem" },
      keyframes: {
        // suave (por si querés usarlo en otros lados)
        float: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
        // más grande: sube ~36px y deriva un poco en X
        "float-lg": {
          "0%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(12px,-36px,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        // bien exagerado: sube ~60px, deriva + ligera rotación/scale
        "float-xl": {
          "0%": { transform: "translate3d(0,0,0) rotate(0deg) scale(1)" },
          "50%": {
            transform: "translate3d(24px,-60px,0) rotate(3deg) scale(1.03)",
          },
          "100%": { transform: "translate3d(0,0,0) rotate(0deg) scale(1)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-lg": "float-lg 6s ease-in-out infinite",
        "float-xl": "float-xl 7s ease-in-out infinite",
      },
    },
  },
};
