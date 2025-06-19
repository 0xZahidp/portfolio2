/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Include if you're using Next.js app directory
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#202022",
          200: "#2d2e32",
          300: "#25262a",
          400: "rgba(12, 12, 12, 0.55)", // Updated with RGBA transparency
        },
        green: {
          100: "#64f4ac",
          300: "rgba(100, 244, 172, 0.7)",
          400: "#05ff82",
          500: "#15eb80",
          600: "rgba(3, 252, 128, 0.4)",
        },
        red: {
          100: "rgba(255, 0, 0, 0.4)", // Transparent red
          200: "#ff0000",
        },
        white: {
          100: "#ffffff",
          200: "#cccccc",
          300: "#777777",
        },
        blue: {
          200: "#4898f0",
          400: "#503cef",
          600: "#513cef",
          800: "#140e32",
        },
      },
    },
  },
  plugins: [],
};