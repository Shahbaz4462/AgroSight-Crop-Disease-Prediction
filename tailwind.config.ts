import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        agro: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        forest: {
          DEFAULT: "#0f281e",
          light: "#183b2d",
          dark: "#081a13",
        },
        sage: {
          50: "#f6f7f5",
          100: "#e8ebe6",
          200: "#d2d8ce",
          300: "#b2bdaf",
          400: "#8f9d8c",
          500: "#71806e",
          600: "#586556",
          700: "#465144",
          800: "#3a4239",
          900: "#323831",
          950: "#191e19",
        },
        ai: {
          cyan: "#06b6d4",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "scan-line": "scan 2.8s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-sweep": "radar 4s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        scan: {
          "0%, 100%": { top: "5%" },
          "50%": { top: "90%" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

