import { useState } from "react";
import { useTranslation } from "react-i18next";
import {Terminal,Zap,Layers} from "lucide-react";
import "./DeveloperTerminal.css";
const array=v=>Array.isArray(v)?v:[];
export default function DeveloperTerminal(){
 const {t}=useTranslation();
 const [command,setCommand]=useState("");
 const [history,setHistory]=useState([]);
 function run(raw){
 const cmd=raw.trim().toLowerCase();
 if(!cmd)return;
 if(cmd==="clear"){setHistory([]);setCommand("");return;}
 const answers={help:"whoami · skills · projects · contact · clear",whoami:t("hero.firstName",{defaultValue:"Abdulaziz"})+" "+t("hero.lastName",{defaultValue:"Orifov"})+" — "+t("hero.role",{defaultValue:"Fullstack Developer"}),skills:array(t("skills.cards",{returnObjects:true})).flatMap(c=>array(c?.tags)).join(" · "),projects:array(t("work.projects",{returnObjects:true})).map(p=>p?.title).filter(Boolean).join(" / "),contact:"github.com/AzizchikOff"};
 setHistory(h=>[...h.slice(-29),{cmd,result:Object.hasOwn(answers,cmd)?answers[cmd]:"Unknown command. Type help."}]);setCommand("");
 }
 return <section className="block" id="terminal"><div className="wrap"><div className="sec-head"><span className="sec-tag">AO / TERMINAL</span><div className="sec-line"/><h2>Interactive<br/>Developer<br/><em>Terminal_</em></h2><p>Buyruqlar orqali ko‘nikmalarim va loyihalarim haqida tezkor ma’lumot oling.</p><div className="terminal-features"><span><Terminal/> Real-time response</span><span><Zap/> Portfolio ma’lumotlari</span><span><Layers/> Interaktiv tajriba</span></div></div><div className="ao-console"><header><div className="terminal-lights"><i/><i/><i/></div><span>aziz@portfolio: ~</span></header><div className="ao-console-output" role="log"><p className="terminal-welcome">AO Terminal v1.0 — Welcome</p><p>Type help to see available commands.</p>{history.map((h,i)=><div key={i}><strong>aziz@portfolio:~$ {h.cmd}</strong><p>{h.result}</p></div>)}</div><form onSubmit={e=>{e.preventDefault();run(command)}}><label htmlFor="ao-command">❯</label><input id="ao-command" aria-label="Terminal command" value={command} onChange={e=>setCommand(e.target.value)} placeholder="help" autoComplete="off" maxLength={100}/><button>Run</button></form><div className="ao-console-actions">{["help","whoami","skills","projects","contact","clear"].map(c=><button key={c} onClick={()=>run(c)}>{c}</button>)}</div></div></div></section>
}
