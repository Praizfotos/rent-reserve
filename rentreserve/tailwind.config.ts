import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      colors: {
        canvas: {
          DEFAULT: "rgb(255 255 255)",
          subtle: "rgb(252 252 252)",
          muted: "rgb(248 248 248)",
          footer: "rgb(247 247 247)",
        },
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        snug: "-0.015em",
      },
      lineHeight: {
        tighter: "0.98",
      },
      maxWidth: {
        page: "1280px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animationTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
