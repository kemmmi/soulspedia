import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // --- AQUÍ AÑADIMOS LAS FUENTES ---
      fontFamily: {
        optimus: ['OptimusPrinceps', 'serif'],
        lore: ['var(--font-ds-inventory)', 'serif'], // Esta es la de EB Garamond
      },
      // ---------------------------------
      keyframes: {
        burn: {
          '0%': { filter: 'blur(10px) brightness(2)', opacity: '0' },
          '100%': { filter: 'blur(0px) brightness(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in-burn': 'burn 3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;