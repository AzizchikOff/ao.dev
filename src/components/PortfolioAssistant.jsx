import {useState} from "react";
import {useTranslation} from "react-i18next";
export default function PortfolioAssistant(){
 const {t}=useTranslation();const [open,setOpen]=useState(false),[answer,setAnswer]=useState("");
 const topics=[["Ko‘nikmalar",()=>t("skills.cards",{returnObjects:true}).flatMap(c=>c.tags).join(", ")],["Loyihalar",()=>t("work.projects",{returnObjects:true}).map(p=>p.title).join(", ")],["Developer",()=>t("hero.sub")],["Kontakt",()=>"github.com/AzizchikOff"]];
 return <aside className="ao-assistant"><button aria-expanded={open} onClick={()=>setOpen(v=>!v)}>AO Assistant {open?"−":"+"}</button>{open&&<div className="ao-assistant-panel"><h3>Portfolio yordamchisi</h3><p>Portfolio ma’lumotlari bo‘yicha tayyor javoblar. Bu generativ AI emas.</p>{topics.map(([label,fn])=><button key={label} onClick={()=>setAnswer(fn())}>{label}</button>)}<p role="status">{answer}</p></div>}</aside>
}
