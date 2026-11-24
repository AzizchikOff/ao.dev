import {api,configured} from "../lib/portfolioApi";
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

  useEffect(()=>{if(configured && !window.location.pathname.startsWith("/admin") && !localStorage.getItem(STORAGE_KEY))api("/rest/v1/portfolio_content?section=eq.settings&select=content").then(r=>{const id=r[0]?.content?.defaultTheme;if(Object.hasOwn(themes,id))setThemeId(id)}).catch(()=>{});},[]);
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
