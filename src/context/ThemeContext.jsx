import { useEffect, useState, useCallback } from "react";
import { themes, themeOrder } from "./themes";
import { ThemeContext } from "./theme-context-instance";

const STORAGE_KEY = "portfolio_theme";

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && themes[saved]) return saved;
    } catch {
      /* ignore */
    }
    return "signal";
  });

  useEffect(() => {
    const tokens = themes[themeId].tokens;
    const root = document.documentElement;
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    root.setAttribute("data-theme", themeId);
    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch {
      /* ignore */
    }
  }, [themeId]);

  const cycleTheme = useCallback(() => {
    setThemeId((prev) => {
      const idx = themeOrder.indexOf(prev);
      return themeOrder[(idx + 1) % themeOrder.length];
    });
  }, []);

  const value = {
    themeId,
    setThemeId,
    cycleTheme,
    theme: themes[themeId],
    allThemes: themeOrder.map((id) => themes[id]),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
