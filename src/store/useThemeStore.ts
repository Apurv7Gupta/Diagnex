import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (theme: "light" | "dark") => {
        set({ theme });
        // Apply theme to document
        document.documentElement.setAttribute("data-theme", theme);
      },
      initializeTheme: () => {
        const { theme } = get();
        document.documentElement.setAttribute("data-theme", theme);
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
