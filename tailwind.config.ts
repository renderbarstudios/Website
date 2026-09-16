import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Renderbar brand tokens (official brand standards)
        "signal-red": "#E01A1A", // Primary CTA, key headlines, logo ring, emphasis
        "electric-blue": "#2B3A9E", // Brand blue — graphics/UI accents (fails AA as text on black)
        "link-blue": "#6E83E0", // Accessible electric-blue tint for text/links on dark (5.6:1 on void-black, WCAG AA)
        "live-green": "#6CC520", // Status/success only, sparingly
        "studio-gray": "#555555", // Body text on light, "STUDIOS" in logo
        "void-black": "#0A0A0A", // Primary dark background, premium surfaces
        "dark-surface": "#141414", // Cards on dark backgrounds
        "mid-gray": "#888888", // Captions, metadata
        "light-gray": "#E8E8E8", // Borders, dividers
        "off-white": "#F5F4F2", // Light page backgrounds / text on dark
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter2: "-0.02em",
        eyebrow: "0.4em",
        label: "0.05em",
      },
      fontSize: {
        // Responsive display sizes per brand typography scale
        display: [
          "clamp(2.5rem, 6vw, 6rem)",
          { lineHeight: "0.98", letterSpacing: "-0.03em" },
        ],
        h2: [
          "clamp(1.75rem, 3.5vw, 2.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        h3: [
          "clamp(1.25rem, 2vw, 1.5rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em" },
        ],
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease forwards",
        fadeInUp: "fadeInUp 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
