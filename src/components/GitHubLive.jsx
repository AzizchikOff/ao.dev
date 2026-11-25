import {useTranslation} from "react-i18next";
import ProjectCard from "./ProjectCard";
import "./Work.css";
export default function GitHubLive(){
 const {t,i18n}=useTranslation();
 const data=t("work.projects",{returnObjects:true});
 const projects=Array.isArray(data)?data.filter(p=>p&&p.title&&typeof p.demoUrl==="string"&&p.demoUrl.startsWith("https://")&&!/^https:\/\/(www\.)?github\.com(?:\/|$)/i.test(p.demoUrl)):[];
 const lang=i18n.language?.slice(0,2);
 const title=lang==="ru"?"Мои проекты":lang==="en"?"My projects":"Mening loyihalarim";
 return <section className="block" id="github"><div className="wrap"><div className="sec-head"><h2>{title}</h2></div><div className="github-live-grid">{projects.map((p,i)=><ProjectCard key={i} project={p} lang={lang}/>)}</div><a href="/work">{t("nav.work",{defaultValue:"Projects"})} ↗</a></div></section>
}
