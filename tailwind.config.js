export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./sections/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        p: "#8b5cf6",
        p2: "#a78bfa",
        p3: "#c4b5fd",
        cy: "#22d3ee",
        pk: "#ec4899",
        bg: "#050508",
        bg2: "#0f0f14",
      },
      fontFamily: {
        grotesk: ["var(--font-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
