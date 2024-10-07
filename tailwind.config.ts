import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    { pattern: /^gap-/ },
    { pattern: /^w-/ },
    { pattern: /^h-/ },
    { pattern: /^text-/ },
    { pattern: /^bg-/ },
    { pattern: /^btn-/ },
    { pattern: /^text-field-/ },
    { pattern: /^todo-/ },
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
};
export default config;
