import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#132238",
        coral: "#ef6f5e",
        sand: "#f5efe6",
        teal: "#1e6f73",
        mist: "#e7f1ef",
      },
      boxShadow: {
        card: "0 24px 60px rgba(19, 34, 56, 0.12)",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [typography],
}
