import type { Config } from "tailwindcss";


/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        "2xl": "128px",
      },
    },
    fontFamily: {
      display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
      body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
    },

    extend: {
      colors: {
        primary: {
          50: "rgb(var(--c-primary-50))",
          100: "rgb(var(--c-primary-100))",
          200: "rgb(var(--c-primary-200))",
          300: "rgb(var(--c-primary-300))",
          400: "rgb(var(--c-primary-400))",
          500: "rgb(var(--c-primary-500))",
          600: "rgb(var(--c-primary-600))",
          700: "rgb(var(--c-primary-700))",
          800: "rgb(var(--c-primary-800))",
          900: "rgb(var(--c-primary-900))",
        },
        secondary: {
          50: "rgb(var(--c-secondary-50))",
          100: "rgb(var(--c-secondary-100))",
          200: "rgb(var(--c-secondary-200))",
          300: "rgb(var(--c-secondary-300))",
          400: "rgb(var(--c-secondary-400))",
          500: "rgb(var(--c-secondary-500))",
          600: "rgb(var(--c-secondary-600))",
          700: "rgb(var(--c-secondary-700))",
          800: "rgb(var(--c-secondary-800))",
          900: "rgb(var(--c-secondary-900))",
        },
        neutral: {
          50: "rgb(var(--c-neutral-50))",
          100: "rgb(var(--c-neutral-100))",
          200: "rgb(var(--c-neutral-200))",
          300: "rgb(var(--c-neutral-300))",
          400: "rgb(var(--c-neutral-400))",
          500: "rgb(var(--c-neutral-500))",
          600: "rgb(var(--c-neutral-600))",
          700: "rgb(var(--c-neutral-700))",
          800: "rgb(var(--c-neutral-800))",
          900: "rgb(var(--c-neutral-900))",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};


export default config;