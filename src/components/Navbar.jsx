import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Home, User, Layers, Award, FileText, Mail, Settings } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import "./Navbar.css";

const navIcons={home:Home,about:User,work:Layers,certificates:Award,blog:FileText};
export default function Navbar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(()=>{const close=e=>{if(e.key==="Escape"){setMobileOpen(false)}};document.addEventListener("keydown",close);return()=>document.removeEventListener("keydown",close)},[]);
  const links = [
    {href:"/",key:"home"},
    { href: "/about", key: "about" },
    { href: "/skills", key: "skills" },
    { href: "/work", key: "work" },
    { href: "/experience", key: "experience" },
    { href: "/playground", key: "playground" },
    {href:"/terminal",key:"terminal"},
    { href: "/blog", key: "blog" },
    { href: "/certificates", key: "certificates" },
    { href: "/resume", key: "resume" },
  ];

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="wrap nav-inner">
        <a href="/" className="logo" data-cursor="Tepaga">
          <span className="ao-mark" aria-hidden="true"><span className="ao-letter-a">A</span><span className="ao-letter-o">O</span><span className="ao-dot">.</span></span><span className="ao-brand-name">{t("hero.firstName",{defaultValue:"Abdulaziz"})} {t("hero.lastName",{defaultValue:"Orifov"})}</span>
        </a>

        <div className="nav-links">
          {links.map((l) => {const Icon=navIcons[l.key];return (
            <a key={l.key} href={l.href} aria-current={window.location.pathname===l.href?"page":undefined} data-cursor="O'tish">
              {Icon&&<Icon size={16}/>}
              {["playground","blog","resume","certificates","terminal"].includes(l.key) ? ({terminal:"Terminal",playground:"Playground",blog:"Blog",resume:"CV",certificates:"Certificates"})[l.key] : t(`nav.${l.key}`,{defaultValue:l.key==="home"?"Home":l.key})}
            </a>
          )})}
          <a href="/contact" className="nav-cta" data-cursor="Yozish">
            <Mail size={16}/> {t("nav.contact")}
          </a>
          <a href="/github">GitHub</a><div className="nav-tools"><a href="/admin"><Settings size={16}/> Admin</a>
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
            aria-label="Menu" aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu"><a href="/admin">Admin</a><a href="/github">GitHub</a>
          {links.map((l) => (
            <a key={l.key} href={l.href} aria-current={window.location.pathname===l.href?"page":undefined} onClick={() => setMobileOpen(false)}>
              {["playground","blog","resume","certificates","terminal"].includes(l.key) ? ({terminal:"Terminal",playground:"Playground",blog:"Blog",resume:"CV",certificates:"Certificates"})[l.key] : t(`nav.${l.key}`,{defaultValue:l.key==="home"?"Home":l.key})}
            </a>
          ))}
          <a href="/contact" onClick={() => setMobileOpen(false)}>
            {t("nav.contact")}
          </a>
        </div>
      )}
    </nav>
  );
}
