import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./DeveloperTerminal.css";
export default function DeveloperTerminal(){
 const {t}=useTranslation();
 const [command,setCommand]=useState("");
 const [history,setHistory]=useState([]);
 function run(raw){
 const cmd=raw.trim().toLowerCase();
 if(!cmd)return;
 if(cmd==="clear"){setHistory([]);setCommand("");return;}
 const answers={help:"whoami · skills · projects · contact · clear",whoami:"Abdulaziz Orifov — Fullstack Developer",skills:t("skills.cards",{returnObjects:true}).flatMap(c=>c.tags).join(" · "),projects:t("work.projects",{returnObjects:true}).map(p=>p.title).join(" / "),contact:"github.com/AzizchikOff"};
 setHistory(h=>[...h.slice(-29),{cmd,result:Object.hasOwn(answers,cmd)?answers[cmd]:"Unknown command. Type help."}]);setCommand("");
 }
 return <section className="block" id="terminal"><div className="wrap"><div className="sec-head"><span className="sec-tag">AO / TERMINAL</span><div className="sec-line"/><h2>Interactive Terminal</h2></div><div className="ao-console"><header>● ● ● <span>aziz@portfolio:~</span></header><div className="ao-console-output" role="log"><p>Welcome to AO Terminal. Type help.</p>{history.map((h,i)=><div key={i}><strong>❯ {h.cmd}</strong><p>{h.result}</p></div>)}</div><form onSubmit={e=>{e.preventDefault();run(command)}}><label htmlFor="ao-command">❯</label><input id="ao-command" value={command} onChange={e=>setCommand(e.target.value)} placeholder="help" autoComplete="off" maxLength={100}/><button>Run</button></form><div className="ao-console-actions">{["help","whoami","skills","projects","contact","clear"].map(c=><button key={c} onClick={()=>run(c)}>{c}</button>)}</div></div></div></section>
}
