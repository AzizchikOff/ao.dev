import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import "./LanguageSwitcher.css";

const LANGS = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const current = LANGS.find((l) => l.code === i18n.language) || LANGS[0];

  return (
    <div className="lang-switch" ref={ref}>
      <button
        className="lang-trigger"
        data-cursor="Til"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current.label}
        <span className={`lang-caret ${open ? "open" : ""}`}>▾</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="lang-menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            role="listbox"
          >
            {LANGS.map((l) => (
              <button
                key={l.code}
                className={`lang-option ${l.code === i18n.language ? "active" : ""}`}
                data-cursor="Tanlash"
                onClick={() => {
                  i18n.changeLanguage(l.code);
                  setOpen(false);
                }}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
