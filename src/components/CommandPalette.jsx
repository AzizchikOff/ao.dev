import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./CommandPalette.css";

const destinations = [
  ["", "Home"], ["terminal", "Terminal"], ["github", "GitHub"], ["about", "About"], ["skills", "Skills"], ["work", "Projects"],
  ["experience", "Experience"], ["playground", "Playground"], ["blog", "Blog"], ["certificates", "Certificates"], ["resume", "CV"], ["contact", "Contact"]
];
export default function CommandPalette() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  useEffect(() => {
    const handler = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setQuery(""); setOpen(v => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    searchRef.current?.focus();
    const trapFocus = (event) => {
      if (event.key !== "Tab") return;
      const dialog = searchRef.current?.closest('[role="dialog"]');
      const focusable = [...(dialog?.querySelectorAll('a[href],button:not([disabled]),input:not([disabled])') || [])];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", trapFocus);
      previous?.focus?.();
    };
  }, [open]);
  const items = useMemo(() => destinations.map(([id, fallback]) => ({
    id, name: ["about","skills","work","experience","contact"].includes(id) ? t(`nav.${id}`) : fallback
  })).filter(item => item.name.toLowerCase().includes(query.toLowerCase())), [query,t]);
  if (!open) return null;
  return <div className="command-overlay" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}>
    <div className="command-dialog" role="dialog" aria-modal="true" aria-label="Quick navigation">
      <div className="command-search"><Search size={20}/><input ref={searchRef} placeholder="Search sections…" value={query} onChange={e => setQuery(e.target.value)}/><button aria-label="Close" onClick={() => setOpen(false)}><X size={18}/></button></div>
      <div className="command-results">{items.map(item => <a key={item.id} href={`/${item.id}`} onClick={() => setOpen(false)}>{item.name}<span>↵</span></a>)}{!items.length && <p>No results</p>}</div>
      <div className="command-hint">Ctrl / ⌘ + K · Esc</div>
    </div>
  </div>;
}
