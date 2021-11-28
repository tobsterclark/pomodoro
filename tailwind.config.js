module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
      colors: {
        bgLight: "#fc5c65",
        bgDark: "#eb3b5a",
        default: "#f56f76",
        dark: "#c53e3e",
        buttonWhite: "#fff0f0",
        buttonText: "#382b22",
        buttonBorder: "#b18597",
        buttonBg: "#fdd6e0",
        timerBg: "#dd3b3b"
      },
      width: {
        425: "425px"
      },
      height: {
        300: "300px",
      },
      borderWidth: {
        10: '15px'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      transform: ['active'],
      translate: ['active']
    },
  },
  plugins: [],
}
