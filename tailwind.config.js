/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Urbanist: ["Urbanist-Regular", "sans-serif"],
        UrbanistBold: ["Urbanist-Bold", "sans-serif"],
        UrbanistExtraBold: ["Urbanist-ExtraBold", "sans-serif"],
        UrbanistExtraLight: ["Urbanist-ExtraLight", "sans-serif"],
        UrbanistLight: ["Urbanist-Light", "sans-serif"],
        UrbanistMedium: ["Urbanist-Medium", "sans-serif"],
        UrbanistSemiBold: ["Urbanist-SemiBold", "sans-serif"],
      },
      colors:{
        pink:{
          30: "#F2F5EB",
          200: "#FCF6F1",
          300: "#FFCBC4",
          400: "#FADEDA",
          700: "#F598B7",
          800: "#F699B4"
        },
        blue:{
          900: "#303C58"
        },
        brown:{
          800:"#4F3422"
        },
        danger: {
          500: "#F56565"
        },
        gray:{
          730: "#736B66"
        },
        black: {
          520: '#00000084', 
        },
        purple:{
          200: "#DEE3FF",
          400: "#D6CFFA",
          800: "#570074"
        }
      }
    },
  },
  plugins: [],
}