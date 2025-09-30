/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Usamos variables de next/font para evitar FOUT
      fontFamily: {
        sans: ["var(--font-open-sans)", "ui-sans-serif", "system-ui"],
        heading: ["var(--font-montserrat)", "ui-sans-serif", "system-ui"],
      },
      borderRadius: { xl: "1rem", "2xl": "1.5rem" },
    },
  },
};
