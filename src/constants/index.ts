export const THEMES = [
  {
    name: "light",
    colors: ["#ffffff", "#f8fafc", "#000000", "#3b82f6"],
  },
  {
    name: "dark",
    colors: ["#000000", "#1e293b", "#ffffff", "#60a5fa"],
  },
  {
    name: "blue",
    colors: ["#dbeafe", "#3b82f6", "#1e40af", "#ffffff"],
  },
  {
    name: "green",
    colors: ["#dcfce7", "#22c55e", "#15803d", "#ffffff"],
  },
  {
    name: "purple",
    colors: ["#f3e8ff", "#a855f7", "#7c3aed", "#ffffff"],
  },
  {
    name: "rose",
    colors: ["#ffe4e6", "#f43f5e", "#e11d48", "#ffffff"],
  },
] as const;

export type Theme = (typeof THEMES)[number]["name"];
