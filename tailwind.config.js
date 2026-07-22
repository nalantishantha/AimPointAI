/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "#090A0F",
          text: "#FFFFFF"
        },
        secondary: {
          bg: "#13161F",
          text: "#A1A1AA"
        },
        accent: {
          DEFAULT: "#F47A20",
          dark: "#D85C00"
        },
        neural: {
          DEFAULT: "#00F0FF",
          dark: "#00A3AD"
        },
        success: "#22C55E",
        error: "#EF4444",
        card: "#13161F",
        border: "#1E2330"
      },
      fontFamily: {
        hero: ["System"],
        body: ["System"],
        mono: ["Courier New", "monospace"]
      }
    },
  },
  plugins: [],
}
