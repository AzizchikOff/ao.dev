import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, X, Search } from "lucide-react";
import GitHubLive from "./GitHubLive";
import "./Work.css";
import "./WorkEnhancements.css";

function ProjectRow({ project, flip, viewLabel, onOpen }) {
  return (
    <article className={`project ${flip ? "project-row-flip" : ""}`}>
      <div className="project-visual" data-cursor="Ochish">{project.imageUrl?.startsWith("https://") && <img src={project.imageUrl} alt={project.title} loading="lazy" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0}}/>}<div className="glow" /><span className="mono-tag">{project.file}</span></div>
      <div className="project-body">
        <div className="project-index">{project.index}</div><h3>{project.title}</h3><p>{project.desc}</p>
        <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <button type="button" className="project-link" onClick={onOpen} data-cursor="Ochish">{viewLabel} <ArrowUpRight size={15}/></button>
      </div>
    </article>
  );
}

const descriptions = {
  uz: {search:"Loyihani qidirish",all:"Barchasi",close:"Yopish",overview:"Loyiha tavsifi",stack:"Texnologiyalar",disclaimer:"Portfolio namuna kontenti. Haqiqiy loyiha natijalari va havolalari tasdiqlangach qo‘shiladi.",next:"Keyingi loyiha",empty:"Loyihalar topilmadi"},
  ru: {search:"Поиск проектов",all:"Все",close:"Закрыть",overview:"Описание проекта",stack:"Технологии",disclaimer:"Демонстрационный контент портфолио. Подтверждённые результаты и ссылки будут добавлены позже.",next:"Следующий проект",empty:"Проекты не найдены"},
  en: {search:"Search projects",all:"All",close:"Close",overview:"Project overview",stack:"Technology stack",disclaimer:"Illustrative portfolio content. Verified project results and links will be added when available.",next:"Next project",empty:"No matching projects"}
};
export default function Work() {
  const { t, i18n } = useTranslation();
  const data = t("work.projects", { returnObjects: true });
  const projects = useMemo(()=>Array.isArray(data)?data.filter(p=>p&&Array.isArray(p.tags)):[],[data]);
  const lang = i18n.language?.slice(0,2);
  const copy = descriptions[lang] || descriptions.uz;
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const [selected, setSelected] = useState(null);
  const slugFor = (project) => String(project.index||project.title).split(" / ").pop().toLowerCase();
  const closeRef = useRef(null);
  useEffect(() => {
    if (!selected) return;
    closeRef.current?.focus();
    const handleKey = event => {if(event.key==="Escape"){setSelected(null);window.history.replaceState(null,"","/work");}};
    document.addEventListener("keydown",handleKey);
    return ()=>document.removeEventListener("keydown",handleKey);
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
    <div className="showcase-layout"><aside className="work-filters"><div className="showcase-profile"><strong>{t("hero.firstName",{defaultValue:"Abdulaziz"})} {t("hero.lastName",{defaultValue:"Orifov"})}</strong><p>{t("about.meta.statusVal")}</p><a href="/resume">CV ↗</a><a href="/contact">{t("nav.contact")} ↗</a><a href="/playground">Playground ↗</a><a href="/github">GitHub Live ↗</a></div>
      <label className="work-search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder={copy.search} aria-label={copy.search}/></label>
      <div className="work-tags"><button className={tag==="all"?"active":""} onClick={()=>setTag("all")}>{copy.all}</button>{tags.map(value=><button key={value} className={tag===value?"active":""} onClick={()=>setTag(value)}>{value}</button>)}</div>
    </aside><div className="showcase-results">
    <p className="work-demo-notice">{copy.disclaimer}</p>
    <div className="project-list">{filtered.map((project,i)=><ProjectRow key={project.index} project={project} flip={i%2===1} viewLabel={t("work.viewProject")} onOpen={()=>openProject(project)}/>)}</div>
    {!filtered.length && <p role="status">{copy.empty}</p>}
    {selected && <div className="case-inline">
      <div className="case-inline-body" aria-label={selected.title}>
        <button ref={closeRef} className="case-close" onClick={closeProject} aria-label={copy.close}><X size={22}/></button>
        <span className="sec-tag">{selected.index}</span><h2>{selected.title}</h2>
        <h3>{copy.overview}</h3><p>{selected.desc}</p>
        <h3>{copy.stack}</h3><div className="project-tags">{selected.tags.map(v=><span key={v}>{v}</span>)}</div>
        {selected.demoUrl?.startsWith("https://") && <a href={selected.demoUrl} target="_blank" rel="noreferrer">Live demo ↗</a>}{selected.sourceUrl?.startsWith("https://") && <a href={selected.sourceUrl} target="_blank" rel="noreferrer">Source code ↗</a>}<p className="case-disclaimer">{copy.disclaimer}</p>
        <button className="btn-primary" onClick={()=>goToProject(projects[(selectedIndex+1)%projects.length])}>{copy.next} <ArrowUpRight size={15}/></button>
      </div>
    </div>}
    </div><aside className="showcase-side"><section className="showcase-side-card"><h3>Portfolio Assistant</h3><p>{lang==="uz"?"Loyihalar va texnologiyalar haqida ma’lumot":lang==="ru"?"Проекты и технологии":"Explore projects and technologies"}</p><a href="/skills">{t("nav.skills",{defaultValue:"Skills"})} ↗</a><a href="/contact">{t("nav.contact")} ↗</a></section><GitHubLive/><section className="showcase-side-card"><h3>Developer Playground</h3><a href="/playground">Playground ↗</a><a href="/terminal">Terminal ↗</a></section></aside></div>
  </div></section>;
}
