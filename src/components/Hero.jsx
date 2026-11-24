import {useTranslation} from "react-i18next";
import {ArrowRight,Download,Code2,Layers,Award,Terminal, Github} from "lucide-react";
import "./Hero.css";
export default function Hero(){
 const {t,i18n}=useTranslation();
 const lang=i18n.language?.slice(0,2);
 const labels=({uz:["Loyihalar","Sertifikatlar","Texnologiyalar","Terminal","CV ni ko‘rish"],ru:["Проекты","Сертификаты","Технологии","Терминал","Резюме"],en:["Projects","Certificates","Technologies","Terminal","View CV"]})[lang]||["Loyihalar","Sertifikatlar","Texnologiyalar","Terminal","CV"];
 const photo=t("about.photoUrl",{defaultValue:""});
 const stats=t("hero.stats",{returnObjects:true});
 return <section className="neon-home"><div className="wrap"><div className="neon-hero-grid"><div className="neon-intro"><span className="neon-eyebrow">&lt; Hello, I’m / &gt;</span><h1>ABDULAZIZ <em>ORIFOV<span>_</span></em></h1><h2>Fullstack Developer</h2><p>{t("hero.sub")}</p><div className="neon-actions"><a className="neon-primary" href="/work"><Code2 size={20}/>{t("hero.ctaPrimary")}<ArrowRight size={18}/></a><a className="neon-secondary" href="/resume"><Download size={18}/>{labels[4]}</a></div><div className="neon-stack">{(Array.isArray(stats)?stats:[]).map((s,i)=><span key={i}>{s.value}</span>)}<a href="https://github.com/AzizchikOff" aria-label="GitHub"><Github size={24}/></a></div></div><div className="neon-portrait"><div className="neon-orbit"/><div className="neon-ao" aria-hidden="true">AO</div>{typeof photo==="string"&&photo.startsWith("https://")&&<img src={photo} alt="Abdulaziz Orifov"/>}<div className="neon-mini-terminal"><span>🔴 🟡 🟢</span><code>ao@portfolio:~$ whoami</code><strong>Abdulaziz Orifov</strong><code>Fullstack Developer ▌</code></div></div></div><div className="neon-feature-grid">{[[Code2,"/work"],[Award,"/certificates"],[Layers,"/skills"],[Terminal,"/terminal"]].map(([Icon,url],i)=><a key={url} href={url}><Icon size={28}/><strong>{labels[i]}</strong><ArrowRight size={20}/></a>)}</div></div></section>
}
