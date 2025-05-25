import { create } from "zustand";
import { localStorageCache } from "@/utils/settleCache";

interface ThemeStore {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: localStorageCache.getCache('theme') || 'light', 
  setTheme: (theme: "light" | "dark") => {
    localStorageCache.setCache('theme', theme)
    set({ theme });
  },
}));