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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "brand-light-purple": "var(--brand-light-purple)",
        "brand-dark-purple": "var(--brand-dark-purple)",
        "brand-pink": "var(--brand-pink)",
        "brand-lime": "var(--brand-lime)",
      },
    },
  },
  plugins: [],
} satisfies Config;
