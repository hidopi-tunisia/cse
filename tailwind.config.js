const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./storage/framework/views/*.php",
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        cse: "#8b304a",
        csegray: "#c6c6c6",
      },
      fontFamily: {
        sans: ["Red Hat Display", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
