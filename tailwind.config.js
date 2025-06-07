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
          200: "#FCF6F1",
          400: "#FADEDA",
          700: "#F598B7",
        },
        brown:{
          800:"#4F3422"
        }
      }
    },
  },
  plugins: [],
}