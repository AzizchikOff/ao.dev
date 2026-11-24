import {useState} from "react";
import {useTranslation} from "react-i18next";
const copy={uz:["Portfolio yordamchisi","Portfolio bo‘yicha tayyor javoblar. Generativ AI emas.","Ko‘nikmalar","Loyihalar","Developer","Kontakt"],ru:["Помощник портфолио","Готовые ответы о портфолио. Не генеративный ИИ.","Навыки","Проекты","Разработчик","Контакты"],en:["Portfolio assistant","Prepared portfolio answers. Not generative AI.","Skills","Projects","Developer","Contact"]};
const array=v=>Array.isArray(v)?v:[];
export default function PortfolioAssistant(){
 const {t,i18n}=useTranslation();const [open,setOpen]=useState(false),[selected,setSelected]=useState(-1);
 const c=copy[i18n.language?.slice(0,2)]||copy.uz;
 const answers=[array(t("skills.cards",{returnObjects:true})).flatMap(v=>array(v?.tags)).join(", "),array(t("work.projects",{returnObjects:true})).map(v=>v?.title).filter(Boolean).join(", "),t("hero.sub"),"github.com/AzizchikOff"];
 return <aside className="ao-assistant"><button aria-expanded={open} onClick={()=>setOpen(v=>!v)}>AO Assistant {open?"−":"+"}</button>{open&&<div className="ao-assistant-panel"><h3>{c[0]}</h3><p>{c[1]}</p>{c.slice(2).map((label,i)=><button key={i} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{label}</button>)}<p role="status">{selected>=0?answers[selected]:""}</p></div>}</aside>
}
