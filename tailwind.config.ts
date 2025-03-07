import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";
import { addDynamicIconSelectors } from "@iconify/tailwind";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bricolage: "var(--font-bricolage)",
      },
      colors: {},
    },
  },
  plugins: [
    heroui({
      prefix: "heroui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      themes: {
        light: {
          colors: {
            background: "#F9F9FB",
            primary: {
              DEFAULT: "#030303",
              foreground: "#f9f9fb",
            },
          },
        },
        dark: {
          colors: {
            background: "#030303",
            primary: "#f9f9fb",
          },
        },
      },
    }),
    addDynamicIconSelectors(),
  ],
} satisfies Config;
