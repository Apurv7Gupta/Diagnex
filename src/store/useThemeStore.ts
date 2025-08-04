import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme } from "../constants"; // auto-inferred from THEMES

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get): ThemeStore => ({
      theme: "light", // default
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute("data-theme", theme);
      },
      initializeTheme: () => {
        const { theme } = get();
        document.documentElement.setAttribute("data-theme", theme);
      },
    }),
    {
      name: "theme-storage", // key in localStorage
    }
  )
);
