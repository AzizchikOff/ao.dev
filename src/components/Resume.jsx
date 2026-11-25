import {useEffect,useState} from "react";
import {useTranslation} from "react-i18next";
import {Printer,FileText} from "lucide-react";
import "./Editorial.css";
import "./ResumeAuto.css";
import {resumeDefaults} from "../lib/resumeDefaults";
async function extract(url){
 const base="https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/";
 const pdfjs=await import(/* @vite-ignore */ (base+"pdf.min.mjs"));
 pdfjs.GlobalWorkerOptions.workerSrc=base+"pdf.worker.min.mjs";
 const task=pdfjs.getDocument({url,isEvalSupported:false});
 try{
 const pdf=await task.promise, pages=[];
 for(let n=1;n<=pdf.numPages;n++){
 const page=await pdf.getPage(n), content=await page.getTextContent();
 let lines=[],line="",lastY;
 for(const item of content.items){
 if(typeof item.str!=="string")continue;
 const y=item.transform[5];
 if(line&&lastY!==undefined&&Math.abs(y-lastY)>3){lines.push(line.trim());line=""}
 line+=(line?" ":"")+item.str;lastY=y;
 if(item.hasEOL){if(line.trim())lines.push(line.trim());line=""}
 }
 if(line.trim())lines.push(line.trim());
 pages.push(lines.join("\n"));
 }
 return pages.join("\n\n").trim();
 }finally{await task.destroy()}
}
function ResumeContent({text}){
 const lines=text.split("\n").map(s=>s.trim()).filter(Boolean);
 const groups=[];const intro=[];let current;
 const headings=/^(PROFIL|PROFILE|SUMMARY|ПРОФИЛЬ|О СЕБЕ|TA[’'‘ʻʼ]LIM|EDUCATION|ОБРАЗОВАНИЕ|TEXNIK KO[’'‘ʻʼ]NIKMALAR|TECHNICAL SKILLS|SKILLS|ТЕХНИЧЕСКИЕ НАВЫКИ|НАВЫКИ|TANLANGAN LOYIHALAR|SELECTED PROJECTS|PROJECTS|ИЗБРАННЫЕ ПРОЕКТЫ|ПРОЕКТЫ|TILLAR|LANGUAGES|ЯЗЫКИ|SERTIFIKATLAR|CERTIFICATES|CERTIFICATIONS|СЕРТИФИКАТЫ|EXPERIENCE|TAJRIBA|ОПЫТ)$/iu;
 for(const line of lines){if(headings.test(line)){current={title:line,lines:[]};groups.push(current)}else if(current)current.lines.push(line);else intro.push(line)}
 return <div className="cv-auto"><header className="cv-identity"><span className="cv-monogram" aria-hidden="true">AO</span><div><h3>{intro[0]}</h3><p className="cv-role">{intro[1]}</p><div className="cv-contacts">{intro.slice(2).map((v,i)=><span key={i}>{v}</span>)}</div></div></header><div className="cv-bento">{groups.map((g,i)=><section className="cv-tile" key={i}><span className="cv-number">{String(i+1).padStart(2,"0")}</span><h4>{g.title}</h4>{g.lines.map((v,j)=>{const skill=/^(Frontend|Backend|Database|Tools|Vositalar|Инструменты|Базы данных|Qo[’'‘ʻʼ]shimcha|Additional|Дополнительно):/iu.test(v);return skill?<div className="cv-skill-row" key={j}><strong>{v.split(":")[0]}</strong><div>{v.slice(v.indexOf(":")+1).split(",").map((x,k)=><span key={k}>{x.trim()}</span>)}</div></div>:<p key={j}>{v}</p>})}</section>)}</div></div>
}
export default function Resume(){
 const {i18n,t:translate}=useTranslation();
 const lang=i18n.language?.slice(0,2)||"uz";
 const t=translate("resume",{returnObjects:true,defaultValue:resumeDefaults[lang]||resumeDefaults.uz});
 const url=typeof t.pdfUrl==="string"&&t.pdfUrl.startsWith("https://")?t.pdfUrl:"";
 const [result,setResult]=useState({url:"",text:"",error:false});
 useEffect(()=>{let active=true;if(url)extract(url).then(text=>{if(active)setResult({url,text,error:!text})}).catch(()=>{if(active)setResult({url,text:"",error:true})});return()=>{active=false}},[url]);
 const c=lang==="ru"?["Резюме пока не загружено","Чтение PDF…","Не удалось извлечь текст. Откройте PDF.","Открыть PDF"]:lang==="en"?["Resume not uploaded yet","Reading PDF…","Text unavailable. Open the original PDF.","Open PDF"]:["Rezyume hali yuklanmagan","PDF o‘qilmoqda…","Matnni ajratib bo‘lmadi. Asl PDF faylni oching.","PDF faylni ochish"];
 return <section className="block editorial resume-section" id="resume"><div className="wrap"><div className="sec-head"><span className="sec-tag">{t.tag}</span><div className="sec-line"/><h2>{t.title}</h2></div><div className="resume-sheet"><div className="resume-heading"><span className="editorial-meta">AO / CV</span>{url&&<div style={{display:"flex",gap:12,flexWrap:"wrap"}}><a href={url} target="_blank" rel="noreferrer"><FileText size={16}/>{c[3]} ↗</a><button className="resume-print" onClick={()=>window.print()}><Printer size={16}/>{t.print}</button></div>}</div>{!url?<p>{c[0]}</p>:result.url!==url?<p role="status">{c[1]}</p>:result.error?<p role="status">{c[2]}</p>:<ResumeContent text={result.text}/>}</div></div></section>
}
