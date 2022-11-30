module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}"],
  darkMode: "class",
  theme: {
    screens: {
      compact: "1500px",
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar"), require("tailwind-scrollbar-hide")],
}
