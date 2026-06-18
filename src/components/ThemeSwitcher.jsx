import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";
import { useTheme } from "../context/useTheme";
import "./ThemeSwitcher.css";

export default function ThemeSwitcher() {
  const { themeId, setThemeId, allThemes } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="theme-switch" ref={ref}>
      <button
        className="theme-trigger"
        data-cursor="Rang"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Rangni o'zgartirish"
      >
        <Palette size={16} strokeWidth={1.8} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="theme-menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            role="listbox"
          >
            {allThemes.map((t) => (
              <button
                key={t.id}
                className={`theme-option ${t.id === themeId ? "active" : ""}`}
                data-cursor="Tanlash"
                onClick={() => {
                  setThemeId(t.id);
                  setOpen(false);
                }}
              >
                <span
                  className="theme-swatch"
                  style={{ background: t.swatch }}
                />
                {t.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
