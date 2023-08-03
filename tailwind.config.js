const plugin = require("tailwindcss/plugin");

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#53140b",
        "primary-light": "#f9bbb2",
        secondary: "#bd8f6b",
        "secondary-light": "#f4d4bb",
        light: "#F1F5F9",
        dark: "#1E293B",
        medium: "#64748B",
      },
      fontFamily: {
        "lato-thin": "Lato-Thin",
        "lato-thinitalic": "Lato-ThinItalic",
        "lato-light": "Lato-Light",
        "lato-lightitalic": "Lato-LightItalic",
        lato: "Lato-Regular",
        "lato-italic": "Lato-Italic",
        "lato-bold": "Lato-Bold",
        "lato-bolditalic": "Lato-BoldItalic",
        "lato-black": "Lato-Black",
        "lato-blackitalic": "Lato-BlackItalic",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        btn: `px-4 py-1 rounded-full bg-red-800 text-white`,
        "body-text": `font-serif leading-relaxed tracking-wide text-gray-800`,
      });
    }),
  ],
};
