import type { Config } from "tailwindcss";

export default {
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
        terminal: {
          bg: "var(--terminal-bg)",
          green: "var(--terminal-green)",
          amber: "var(--terminal-amber)",
          cyan: "var(--terminal-cyan)",
          red: "var(--terminal-red)",
          gray: "var(--terminal-gray)",
          white: "var(--terminal-white)",
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      animation: {
        'typewriter': 'typewriter 3s steps(40, end)',
        'blink': 'blink 1s infinite',
        'flicker': 'flicker 0.15s infinite linear',
      },
    },
  },
  plugins: [],
} satisfies Config;
