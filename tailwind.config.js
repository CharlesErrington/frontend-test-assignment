/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        simbase: {
          orange: {
            100: '#FEE7E4',
            200: '#FCCFC8',
            300: '#FAB7AC',
            400: '#F89F90',
            500: '#F68774',
            600: '#F46F58',
            700: '#F2573C',
            800: '#FF5745', 
            900: '#F03D2E',
          },
          blue: {
            100: '#E6EAF2',
            200: '#CCD6E5',
            300: '#B3C1D8',
            400: '#99ADCB',
            500: '#8099BE',
            600: '#6684B1',
            700: '#4D70A4',
            800: '#335B97',
            900: '#12346A', 
            950: '#122F58',
          },
        },
      },
    },
  },
  plugins: [nextui()],
}

