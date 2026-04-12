export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e63946', // Assuming red from logo, will adjust based on actual logo
          dark: '#c1121f',
        },
        secondary: {
          DEFAULT: '#ffb703', // Assuming yellow
          dark: '#fb8500',
        },
        dark: '#023047'
      }
    },
  },
  plugins: [],
}
