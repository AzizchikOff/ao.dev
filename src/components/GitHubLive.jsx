import {useTranslation} from "react-i18next";
import "./Work.css";
export default function GitHubLive(){
 const {t,i18n}=useTranslation();
 const data=t("work.projects",{returnObjects:true});
 const projects=Array.isArray(data)?data.filter(p=>p&&p.title&&typeof p.demoUrl==="string"&&p.demoUrl.startsWith("https://")&&!/^https:\/\/(www\.)?github\.com(?:\/|$)/i.test(p.demoUrl)):[];
 const lang=i18n.language?.slice(0,2);
 const title=lang==="ru"?"Мои проекты":lang==="en"?"My projects":"Mening loyihalarim";
 return <section className="block" id="github"><div className="wrap"><div className="sec-head"><h2>{title}</h2></div><div className="github-live-grid">{projects.map((p,i)=><article key={i}><a href={p.demoUrl} target="_blank" rel="noreferrer">{p.imageUrl?.startsWith("https://")&&<img src={p.imageUrl} alt={p.title} loading="lazy" style={{width:"100%",aspectRatio:"16/9",objectFit:"cover",borderRadius:10}}/>}<h3>{p.title} ↗</h3></a></article>)}</div><a href="/work">{t("nav.work",{defaultValue:"Projects"})} ↗</a></div></section>
}
