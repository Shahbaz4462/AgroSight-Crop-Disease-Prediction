import type { Config } from "tailwindcss";

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Sharp by default. Only `full` stays round (status dots).
    borderRadius: {
      none: "0",
      sm: "0",
      DEFAULT: "0",
      md: "0",
      lg: "0",
      xl: "0",
      "2xl": "0",
      "3xl": "0",
      full: "9999px",
    },
    extend: {
      colors: {
        paper: v("paper"),
        card: v("card"),
        ink: v("ink"),
        muted: v("muted"),
        accent: v("accent"),
        forest: { DEFAULT: v("forest"), light: "#183b2d", dark: "#081a13" },
        danger: v("danger"),
        warn: v("warn"),
        ok: v("ok"),
        background: "var(--background)",
        foreground: "var(--foreground)",
        // legacy palettes used by pages not yet redesigned
        agro: {
          50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80",
          500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16",
        },
        sage: {
          50: "#f6f7f5", 100: "#e8ebe6", 200: "#d2d8ce", 300: "#b2bdaf", 400: "#8f9d8c",
          500: "#71806e", 600: "#586556", 700: "#465144", 800: "#3a4239", 900: "#323831", 950: "#191e19",
        },
        ai: { cyan: "#06b6d4", emerald: "#10b981", amber: "#f59e0b", rose: "#f43f5e" },
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        hard: "4px 4px 0 0 rgb(var(--ink))",
        "hard-sm": "2px 2px 0 0 rgb(var(--ink))",
        "hard-lg": "8px 8px 0 0 rgb(var(--ink))",
      },
      animation: {
        marquee: "marquee 76s linear infinite",
        "scan-line": "scan 2.8s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        scan: { "0%, 100%": { top: "5%" }, "50%": { top: "90%" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
      },
    },
  },
  plugins: [],
};

export default config;
