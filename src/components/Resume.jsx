import { useTranslation } from "react-i18next";
import { Printer, Code2, Send } from "lucide-react";
import "./Editorial.css";
import { resumeDefaults } from "../lib/resumeDefaults";
export default function Resume(){
 const {i18n,t:translate}=useTranslation();const t=translate("resume",{returnObjects:true,defaultValue:resumeDefaults[i18n.language?.slice(0,2)]||resumeDefaults.uz});
 return <section className="block editorial resume-section" id="resume"><div className="wrap">
  <div className="sec-head"><span className="sec-tag">{t.tag}</span><div className="sec-line"/><h2>{t.title}</h2></div>
  <div className="resume-sheet"><div className="resume-heading"><div><span className="editorial-meta">AO / CV</span><h3>Abdulaziz Orifov</h3><p>{t.role}</p></div><button className="resume-print" onClick={()=>window.print()}><Printer size={16}/>{t.print}</button></div>
  <p className="editorial-lead">{t.summary}</p><h4>{t.skills}</h4><div className="resume-skills">{["React","JavaScript","HTML","CSS","Vite","Git"].map(v=><span key={v}>{v}</span>)}</div>
  <h4>{t.projects}</h4><a href="https://github.com/AzizchikOff" target="_blank" rel="noreferrer"><Code2 size={17}/>github.com/AzizchikOff</a>
  <h4>{t.contact}</h4><a href="https://t.me/prosto_senior" target="_blank" rel="noreferrer"><Send size={17}/>Telegram</a>
  <p className="resume-note">{t.notice}</p></div>
 </div></section>;
}
