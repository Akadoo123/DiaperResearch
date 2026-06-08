import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F7F9FC",
        card: "#FFFFFF",
        line: "#E5EAF2",
        ink: "#1E293B",
        "ink-soft": "#64748B",
        brand: {
          DEFAULT: "#6366F1",
          50: "#EEF0FF",
          100: "#E0E3FF",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
        },
        leaf: {
          DEFAULT: "#22C55E",
          50: "#ECFDF3",
          100: "#D1FADF",
          500: "#22C55E",
          600: "#16A34A",
        },
        warn: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-noto-thai)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(16,24,40,0.04), 0 4px 16px rgba(16,24,40,0.06)",
        "soft-lg": "0 4px 24px rgba(16,24,40,0.08)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #6366F1 0%, #22C55E 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, #EEF0FF 0%, #ECFDF3 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
