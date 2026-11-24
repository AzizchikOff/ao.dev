import {useTranslation} from "react-i18next";
import {User,Layers,Github,MapPin,Briefcase,Code2} from "lucide-react";
import RichText from "./RichText";
import GitHubLive from "./GitHubLive";
import "./About.css";
export default function About(){
 const {t,i18n}=useTranslation();const lang=i18n.language?.slice(0,2);
 const labels=({uz:["Qisqacha bio","Texnologiyalar","Mavjudlik holati","Tajriba"],ru:["Биография","Технологии","Доступность","Опыт"],en:["Biography","Technologies","Availability","Experience"]})[lang]||["Bio","Stack","Status","Experience"];
 const meta=t("about.meta",{returnObjects:true})||{};const photo=t("about.photoUrl",{defaultValue:""});const skills=t("skills.cards",{returnObjects:true});const tags=[...new Set((Array.isArray(skills)?skills:[]).flatMap(s=>Array.isArray(s.tags)?s.tags:[]))];const experience=t("experience.items",{returnObjects:true});
 return <section className="block" id="about"><div className="wrap"><div className="sec-head"><span className="sec-tag">{t("about.tag")}</span><h2>{t("about.title")}</h2></div><div className="neon-bento"><article className="bento-profile"><div className="bento-photo">{typeof photo==="string"&&photo.startsWith("https://")?<img src={photo} alt="Abdulaziz Orifov"/>:<span>AO</span>}</div><h2>Abdulaziz Orifov</h2><p>Fullstack Developer</p><p><MapPin size={16}/> {meta.locationVal}</p><a href="https://github.com/AzizchikOff"><Github size={22}/> GitHub</a></article><article className="bento-bio"><h3><User/> {labels[0]}</h3>{["p1","p2","p3"].map(k=><p key={k}><RichText text={t("about."+k)}/></p>)}</article><article className="bento-tech"><h3><Layers/> {labels[1]}</h3><div>{tags.map(tag=><span key={tag}><Code2 size={20}/>{tag}</span>)}</div></article><article className="bento-status"><h3>{labels[2]}</h3><p className="status-available">{meta.statusVal}</p><p>{meta.directionVal}</p></article><article className="bento-experience"><h3><Briefcase/> {labels[3]}</h3>{(Array.isArray(experience)?experience:[]).map((e,i)=><p key={i}><strong>{e.role}</strong><br/>{e.date} · {e.place}</p>)}</article></div></div><GitHubLive/></section>
}
