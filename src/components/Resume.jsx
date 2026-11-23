import { useTranslation } from "react-i18next";
import { Printer, Code2, Send } from "lucide-react";
import "./Editorial.css";
const copy={
 uz:{tag:"006 / Resume",title:"CV",role:"Fullstack Developer",summary:"React va zamonaviy web texnologiyalari asosida interfeys va ilovalar yaratish yo‘nalishi.",skills:"Texnologiyalar",projects:"Portfolio va kod",contact:"Bog‘lanish",print:"PDF sifatida saqlash / Chop etish",notice:"Ish tajribasi, ta’lim va sertifikatlar tasdiqlangach kiritiladi."},
 ru:{tag:"006 / Резюме",title:"Резюме",role:"Fullstack Developer",summary:"Разработка интерфейсов и веб-приложений с React и современными технологиями.",skills:"Технологии",projects:"Портфолио и код",contact:"Связаться",print:"Сохранить в PDF / Печать",notice:"Опыт работы, образование и сертификаты будут добавлены после подтверждения."},
 en:{tag:"006 / Resume",title:"Resume",role:"Fullstack Developer",summary:"Building web interfaces and applications with React and modern web technologies.",skills:"Technologies",projects:"Portfolio and code",contact:"Contact",print:"Save as PDF / Print",notice:"Employment, education and certificates will be added when verified."}
};
export default function Resume(){
 const {i18n}=useTranslation();const t=copy[i18n.language?.slice(0,2)]||copy.uz;
 return <section className="block editorial resume-section" id="resume"><div className="wrap">
  <div className="sec-head"><span className="sec-tag">{t.tag}</span><div className="sec-line"/><h2>{t.title}</h2></div>
  <div className="resume-sheet"><div className="resume-heading"><div><span className="editorial-meta">AO / CV</span><h3>Abdulaziz Orifov</h3><p>{t.role}</p></div><button className="resume-print" onClick={()=>window.print()}><Printer size={16}/>{t.print}</button></div>
  <p className="editorial-lead">{t.summary}</p><h4>{t.skills}</h4><div className="resume-skills">{["React","JavaScript","HTML","CSS","Vite","Git"].map(v=><span key={v}>{v}</span>)}</div>
  <h4>{t.projects}</h4><a href="https://github.com/AzizchikOff" target="_blank" rel="noreferrer"><Code2 size={17}/>github.com/AzizchikOff</a>
  <h4>{t.contact}</h4><a href="https://t.me/prosto_senior" target="_blank" rel="noreferrer"><Send size={17}/>Telegram</a>
  <p className="resume-note">{t.notice}</p></div>
 </div></section>;
}
