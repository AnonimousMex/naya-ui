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
          50: "#FADEDA",
          200: "#FCF6F1",
          300: "#FFCBC4",
          400: "#FADEDA",
          700: "#F598B7",
          800: "#F699B4"
        },
        blue:{
          900: "#303C58",
          600: "#2C2966"
        },
        brown:{
          20: "#E4B18E",
          50: "#FCF6F1",
          800:"#4F3422"
        },
        danger: {
          500: "#F56565"
        },
        gray:{
          70: "#5A554E",
          60: "#736B66",
          730: "#736B66"
        },
        blue:{
          689: "#6893FF",
          300: "#2D375B",
          80: "#303C58"
          400: "#303C58",
          689: "#6893FF"
        },
        orange:{
          300: "#FF9335"
        },
        red:{
          800: "#FF6868",
          74: "#A74B4B"
        },
        black: {
          520: '#00000084', 
        },
        purple:{
          10: "#F6F1FF",
          20: "#DDD1FF",
          100: "#F6F1FF",
          200: "#DEE3FF",
          300: "#ABA7FF",
          400: "#D6CFFA",
          800: "#570074",
        },
        green:{
          100: "#D1DDD0",
          300: "#6DF481",
        },
        yellow:{
          10: "rgba(248, 230, 60, 0.17)",
          100: "#E8D9A9",
          500: "#FFEA2D"
        },
        white:{
          800: "#F8F5F1"
        }
      }
    },
  },
  plugins: [],
}