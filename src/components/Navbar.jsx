import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import "./Navbar.css";

export default function Navbar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", key: "about" },
    { href: "#skills", key: "skills" },
    { href: "#work", key: "work" },
    { href: "#experience", key: "experience" },
    { href: "#playground", key: "playground" },
  ];

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="wrap nav-inner">
        <a href="#" className="logo" data-cursor="Tepaga">
          AO<span>.</span>dev
        </a>

        <div className="nav-links">
          {links.map((l) => (
            <a key={l.key} href={l.href} data-cursor="O'tish">
              {l.key === "playground" ? "Playground" : t(`nav.${l.key}`)}
            </a>
          ))}
          <a href="#contact" className="nav-cta" data-cursor="Yozish">
            {t("nav.contact")}
          </a>
          <div className="nav-tools">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>

        <div className="nav-mobile-tools">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          {links.map((l) => (
            <a key={l.key} href={l.href} onClick={() => setMobileOpen(false)}>
              {t(`nav.${l.key}`)}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)}>
            {t("nav.contact")}
          </a>
        </div>
      )}
    </nav>
  );
}
