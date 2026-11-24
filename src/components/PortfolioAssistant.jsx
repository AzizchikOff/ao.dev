import {MessageCircle,X,Send,Trash2,Bot} from "lucide-react";
import {useState,useRef,useEffect} from "react";
import {useTranslation} from "react-i18next";
import {matchIntent} from "../lib/assistantModel";
import {listCertificates,configured} from "../lib/portfolioApi";
import "./Assistant.css";
const array=v=>Array.isArray(v)?v:[];
const labels={
 uz:["Salom! Portfolio haqida savol bering.","Savolingizni yozing…","Ko‘nikmalar","Loyihalar","Men haqimda","Tajriba","Sertifikatlar","Kontakt","Bu savolga tasdiqlangan ma’lumot topilmadi.","AI modelini yoqish (model yuklanadi)","Javob tayyorlanmoqda…","Ma’lumot mavjud emas"],
 ru:["Здравствуйте! Спросите о портфолио.","Ваш вопрос…","Навыки","Проекты","Обо мне","Опыт","Сертификаты","Контакты","Подтверждённая информация не найдена.","Включить AI (загрузка модели)","Подготовка ответа…","Нет данных"],
 en:["Hello! Ask me about the portfolio.","Your question…","Skills","Projects","About","Experience","Certificates","Contact","No verified information found for this question.","Enable AI (downloads model)","Preparing answer…","No data available"]
};
const patterns=[/skill|technolog|stack|react|javascript|ko.nikma|texnolog|dasturlash|biladi|навык|технолог/i,/project|loyiha|sayt|website|проект|сайт/i,/who|about|kim|haqida|developer|кто|разработчик/i,/experience|tajriba|ishlagan|опыт/i,/certificate|sertifikat|сертификат/i,/contact|aloqa|bog.lanish|email|telegram|контакт|связ/i];
const routes=["/skills","/work","/about","/experience","/certificates","/contact"];
export default function PortfolioAssistant(){
 const {t,i18n}=useTranslation();
 const c=labels[i18n.language?.slice(0,2)]||labels.uz;
 const [open,setOpen]=useState(false),[input,setInput]=useState(""),[messages,setMessages]=useState([]),[busy,setBusy]=useState(false),[ai,setAi]=useState(false),[failed,setFailed]=useState(false);
 const bottom=useRef(null);
 useEffect(()=>{if(open)bottom.current?.scrollIntoView({block:"nearest"})},[messages,busy,open]);
 async function send(raw){
  const question=raw.trim().slice(0,500);if(!question||busy)return;
  setInput("");setBusy(true);setMessages(m=>[...m.slice(-38),{user:true,text:question}]);
  let idx=patterns.findIndex(p=>p.test(question)),answer=c[8],links=[];
  try{
   if(idx<0&&ai){try{idx=await matchIntent(question,patterns.map((_,i)=>Object.values(labels).map(v=>v[i+2]).join(" / ")))}catch{setFailed(true)}}
   if(idx===0)answer=[...new Set(array(t("skills.cards",{returnObjects:true})).flatMap(v=>array(v?.tags)))].join(" · ");
   if(idx===1){const projects=array(t("work.projects",{returnObjects:true}));answer=projects.map(p=>p?.title).filter(Boolean).join("\n");links=projects.filter(p=>typeof p?.demoUrl==="string"&&p.demoUrl.startsWith("https://")&&!/^https:\/\/(www\.)?github\.com(?:\/|$)/i.test(p.demoUrl)).map(p=>({title:p.title,url:p.demoUrl}))}
   if(idx===2)answer=[t("hero.firstName",{defaultValue:"Abdulaziz"}),t("hero.lastName",{defaultValue:"Orifov"}),"—",t("hero.role",{defaultValue:"Fullstack Developer"}),t("hero.sub")].join(" ");
   if(idx===3)answer=array(t("experience.items",{returnObjects:true})).map(p=>[p.date,p.role,p.place].filter(Boolean).join(" · ")).join("\n");
   if(idx===4)answer=configured?array(await listCertificates()).filter(p=>p.published).map(p=>[p.title,p.issuer].filter(Boolean).join(" — ")).join("\n"):c[11];
   if(idx===5)answer=c[7];
  }catch{answer=c[11]}
  if(idx>=0)links.push({title:c[idx+2]+" ↗",url:routes[idx]});
  setMessages(m=>[...m,{text:answer||c[11],links}]);setBusy(false);
 }
 return <aside className="ao-assistant"><button className="ao-assistant-toggle" aria-label="AO Assistant" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X size={20}/>:<MessageCircle size={20}/>}<span>AO Assistant</span></button>{open&&<div className="ao-assistant-panel ao-chat"><header><Bot size={24}/><strong>AO Assistant 2.0</strong><button aria-label="Clear chat" disabled={busy} onClick={()=>setMessages([])}><Trash2 size={17}/></button></header><label className="ao-ai-option"><input type="checkbox" checked={ai} onChange={e=>{setAi(e.target.checked);setFailed(false)}}/>{c[9]}</label>{failed&&<small>AI unavailable · local search</small>}<div className="ao-chat-log" role="log"><p className="ao-chat-answer">{c[0]}</p>{messages.map((m,i)=><div key={i} className={m.user?"ao-chat-user":"ao-chat-answer"}>{m.text}{m.links?.map((l,j)=><a key={j} href={l.url}>{l.title}</a>)}</div>)}{busy&&<p>{c[10]}</p>}<div ref={bottom}/></div><div className="ao-chat-prompts">{c.slice(2,8).map(label=><button key={label} disabled={busy} onClick={()=>send(label)}>{label}</button>)}</div><form onSubmit={e=>{e.preventDefault();send(input)}}><input aria-label={c[1]} value={input} onChange={e=>setInput(e.target.value)} placeholder={c[1]} maxLength={500}/><button aria-label="Send" disabled={busy||!input.trim()}><Send size={20}/></button></form></div>}</aside>
}
