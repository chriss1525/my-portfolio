import type { Config } from "tailwindcss";

export default {
  content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        fg: "var(--fg)",
        dim: "var(--dim)",
        line: "var(--line)",
        accent: "var(--accent)",
        second: "var(--second)",
        danger: "var(--danger)",
        chip: "var(--chip)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-monospace", "monospace"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: { prose: "68ch" },
    },
  },
  plugins: [],
} satisfies Config;
