import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#B1E90D1A",
          300: "#B1E90D4D",
          600: "#B1E90D99",
          900: "#B1E90DE6",
          1000: "#B1E90D",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          600: "#1D4ED8",
        },
      },
      height: {
        header: "var(--header-height)",
        footer: "var(--footer-height)",
      },
    },
  },
  plugins: [],
} satisfies Config;
