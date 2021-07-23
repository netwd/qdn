module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
  },
  plugins: [],
}
