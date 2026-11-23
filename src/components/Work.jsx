import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight, X, Search } from "lucide-react";
import useReveal from "../hooks/useReveal";
import "./Work.css";
import "./WorkEnhancements.css";

function ProjectRow({ project, flip, viewLabel, onOpen }) {
  const [ref, inView] = useReveal(0.1);
  return (
    <motion.article className={`project ${flip ? "project-row-flip" : ""}`} ref={ref}
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
      <div className="project-visual" data-cursor="Ochish"><div className="glow" /><span className="mono-tag">{project.file}</span></div>
      <div className="project-body">
        <div className="project-index">{project.index}</div><h3>{project.title}</h3><p>{project.desc}</p>
        <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <button type="button" className="project-link" onClick={onOpen} data-cursor="Ochish">{viewLabel} <ArrowUpRight size={15}/></button>
      </div>
    </motion.article>
  );
}

const descriptions = {
  uz: {search:"Loyihani qidirish",all:"Barchasi",close:"Yopish",overview:"Loyiha tavsifi",stack:"Texnologiyalar",disclaimer:"Portfolio namuna kontenti. Haqiqiy loyiha natijalari va havolalari tasdiqlangach qo‘shiladi.",next:"Keyingi loyiha",empty:"Loyihalar topilmadi"},
  ru: {search:"Поиск проектов",all:"Все",close:"Закрыть",overview:"Описание проекта",stack:"Технологии",disclaimer:"Демонстрационный контент портфолио. Подтверждённые результаты и ссылки будут добавлены позже.",next:"Следующий проект",empty:"Проекты не найдены"},
  en: {search:"Search projects",all:"All",close:"Close",overview:"Project overview",stack:"Technology stack",disclaimer:"Illustrative portfolio content. Verified project results and links will be added when available.",next:"Next project",empty:"No matching projects"}
};
export default function Work() {
  const { t, i18n } = useTranslation();
  const projects = t("work.projects", { returnObjects: true });
  const lang = i18n.language?.slice(0,2);
  const copy = descriptions[lang] || descriptions.uz;
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const [selected, setSelected] = useState(null);
  const slugFor = (project) => project.index.split(" / ").pop().toLowerCase();
  const closeRef = useRef(null);
  useEffect(() => {
    if (!selected) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKey = (event) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "Tab") {
        const controls = document.querySelectorAll(".case-dialog button, .case-dialog a[href]");
        const first = controls[0]; const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", handleKey); previousFocus?.focus?.(); };
  }, [selected]);
  const selectedIndex = selected ? projects.findIndex(p => p.index === selected.index) : -1;
  const tags = useMemo(() => [...new Set(projects.flatMap(p => p.tags))], [projects]);
  const filtered = projects.filter(p => (tag === "all" || p.tags.includes(tag)) &&
    [p.title,p.desc,...p.tags].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
  const openProject = (project) => {
    setSelected(project);
    window.history.replaceState(null,"",`#work/${encodeURIComponent(slugFor(project))}`);
  };
  const closeProject = () => { setSelected(null); window.history.replaceState(null,"","#work"); };
  const goToProject = (project) => { setSelected(project); window.history.replaceState(null,"",`#work/${encodeURIComponent(slugFor(project))}`); };
  return <section className="block" id="work"><div className="wrap">
    <div className="sec-head"><span className="sec-tag">{t("work.tag")}</span><div className="sec-line"/><h2>{t("work.title")}</h2></div>
    <div className="work-filters">
      <label className="work-search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder={copy.search} aria-label={copy.search}/></label>
      <div className="work-tags"><button className={tag==="all"?"active":""} onClick={()=>setTag("all")}>{copy.all}</button>{tags.map(value=><button key={value} className={tag===value?"active":""} onClick={()=>setTag(value)}>{value}</button>)}</div>
    </div>
    <p className="work-demo-notice">{copy.disclaimer}</p>
    <div className="project-list">{filtered.map((project,i)=><ProjectRow key={project.index} project={project} flip={i%2===1} viewLabel={t("work.viewProject")} onOpen={()=>openProject(project)}/>)}</div>
    {!filtered.length && <p role="status">{copy.empty}</p>}
    {selected && <div className="case-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)closeProject()}}>
      <div className="case-dialog" role="dialog" aria-modal="true" aria-label={selected.title}>
        <button ref={closeRef} className="case-close" onClick={closeProject} aria-label={copy.close}><X size={22}/></button>
        <span className="sec-tag">{selected.index}</span><h2>{selected.title}</h2>
        <h3>{copy.overview}</h3><p>{selected.desc}</p>
        <h3>{copy.stack}</h3><div className="project-tags">{selected.tags.map(v=><span key={v}>{v}</span>)}</div>
        <p className="case-disclaimer">{copy.disclaimer}</p>
        <button className="btn-primary" onClick={()=>goToProject(projects[(selectedIndex+1)%projects.length])}>{copy.next} <ArrowUpRight size={15}/></button>
      </div>
    </div>}
  </div></section>;
}
