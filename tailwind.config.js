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
        logoKok: "#015EA8",
        logoOch: "#019EE0",
        ochKok: "#D2E9FB",
        main: "#015EA8",
        tiffany: "#40CDCD",
        ortaHavorang: "#C6F8FF",
        ochYashil: "#00DC7F",
        sariq: "#F4C15D",
        ochSariq: "#F0E7DA",
        qora: "#343434",
        kulrang: "#747474",
        kulrangOch: "#E8E8E8",
        yozish: "#F5F5F5",
        background: "#F8FCFF",
        oq: "#FFFFFF",
        ijara: "#FF7448",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      container: {
        center: true,
        screens: {
          sm: "100%",
          md: "728px",
          lg: "1024px",
          xl: "1320px",
        },
      },
    },
  },
  plugins: [],
};
