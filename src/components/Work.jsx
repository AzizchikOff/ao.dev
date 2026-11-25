import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Search} from "lucide-react";
import ProjectCard from "./ProjectCard";
import "./Work.css";
import "./WorkEnhancements.css";
export default function Work(){
 const {t,i18n}=useTranslation();
 const [query,setQuery]=useState("");
 const data=t("work.projects",{returnObjects:true});
 const projects=(Array.isArray(data)?data:[]).filter(p=>p?.title&&p.title.toLowerCase().includes(query.toLowerCase()));
 const lang=i18n.language?.slice(0,2);
 const labels=lang==="ru"?["Поиск проектов","Открыть сайт","Ссылка пока не добавлена"]:lang==="en"?["Search projects","Visit website","Link not added yet"]:["Loyihani qidirish","Saytni ochish","Havola hali qo‘shilmagan"];
 return <section className="block" id="work"><div className="wrap"><div className="sec-head"><h2>{t("work.title")}</h2></div><label className="work-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={labels[0]} aria-label={labels[0]}/></label><div className="public-project-grid">{projects.map((p,i)=><ProjectCard key={i} project={p} lang={lang}/>)}</div></div></section>
}
