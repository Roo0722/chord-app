import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        wood: {
          50: "#faf6f0",
          100: "#f0e4d0",
          200: "#e0c9a3",
          800: "#4a2f1c",
          900: "#2e1c11",
        },
      },
    },
  },
  plugins: [],
};

export default config;
