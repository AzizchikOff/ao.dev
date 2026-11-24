import {useState} from "react";
import {useTranslation} from "react-i18next";
import {ArrowUpRight,Image,Search} from "lucide-react";
import "./Work.css";
import "./WorkEnhancements.css";
export default function Work(){
 const {t,i18n}=useTranslation();
 const [query,setQuery]=useState("");
 const data=t("work.projects",{returnObjects:true});
 const projects=(Array.isArray(data)?data:[]).filter(p=>p?.title&&p.title.toLowerCase().includes(query.toLowerCase()));
 const lang=i18n.language?.slice(0,2);
 const labels=lang==="ru"?["Поиск проектов","Открыть сайт","Ссылка пока не добавлена"]:lang==="en"?["Search projects","Visit website","Link not added yet"]:["Loyihani qidirish","Saytni ochish","Havola hali qo‘shilmagan"];
 return <section className="block" id="work"><div className="wrap"><div className="sec-head"><h2>{t("work.title")}</h2></div><label className="work-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={labels[0]} aria-label={labels[0]}/></label><div className="public-project-grid">{projects.map((p,i)=><article key={i}><div className="public-project-image">{p.imageUrl?.startsWith("https://")?<img src={p.imageUrl} alt={p.title} loading="lazy"/>:<Image size={36} aria-hidden="true"/>}</div><h3>{p.title}</h3>{typeof p.demoUrl==="string"&&p.demoUrl.startsWith("https://")&&!/^https:\/\/(www\.)?github\.com(?:\/|$)/i.test(p.demoUrl)?<a className="project-link" href={p.demoUrl} target="_blank" rel="noreferrer">{labels[1]} <ArrowUpRight size={16}/></a>:<small>{labels[2]}</small>}</article>)}</div></div></section>
}
