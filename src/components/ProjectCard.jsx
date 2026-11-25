import {useState,useEffect,useRef} from "react";
import {Image,ChevronLeft,ChevronRight,ArrowUpRight,X} from "lucide-react";
import "./ProjectCard.css";
const safe=v=>typeof v==="string"&&v.startsWith("https://");
export default function ProjectCard({project:p,lang}){
 const images=[...new Set([p.imageUrl,...(Array.isArray(p.gallery)?p.gallery.map(v=>v?.imageUrl):[])].filter(safe))];
 const [index,setIndex]=useState(0),[paused,setPaused]=useState(false),[open,setOpen]=useState(false);
 const dialog=useRef(null);
 const count=images.length;
 const c=lang==="ru"?["Подробнее","Открыть сайт","Закрыть","Предыдущая","Следующая"]:lang==="en"?["Details","Visit website","Close","Previous","Next"]:["Batafsil","Saytni ochish","Yopish","Oldingi","Keyingi"];
 useEffect(()=>{if(count<2||paused||open||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const timer=setInterval(()=>setIndex(i=>(i+1)%count),4000);return()=>clearInterval(timer)},[count,paused,open]);
 function show(){dialog.current?.showModal();setOpen(true)}
 function close(){dialog.current?.close();setOpen(false)}
 function gallery(){return <div className="project-gallery" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>{count?<img key={images[index%count]} src={images[index%count]} alt={p.title+" — "+(index%count+1)} loading="lazy"/>:<Image size={36}/>}{count>1&&<><button type="button" className="gallery-prev" aria-label={c[3]} onClick={()=>setIndex(i=>(i+count-1)%count)}><ChevronLeft/></button><button type="button" className="gallery-next" aria-label={c[4]} onClick={()=>setIndex(i=>(i+1)%count)}><ChevronRight/></button><div className="gallery-dots">{images.map((url,i)=><button type="button" key={url} aria-label={String(i+1)} aria-pressed={i===index%count} onClick={()=>setIndex(i)}/>)}</div></>}</div>}
 const link=safe(p.demoUrl)&&!/^https:\/\/(www\.)?github\.com(?:\/|$)/i.test(p.demoUrl);
 return <article className="public-project-card">{gallery()}<h3><button type="button" onClick={show}>{p.title}</button></h3><div className="project-card-actions"><button type="button" onClick={show}>{c[0]}</button>{link&&<a href={p.demoUrl} target="_blank" rel="noreferrer">{c[1]} <ArrowUpRight size={15}/></a>}</div><dialog ref={dialog} className="project-detail-dialog" onClose={()=>setOpen(false)}><header><h2>{p.title}</h2><button type="button" aria-label={c[2]} onClick={close}><X/></button></header>{open&&gallery()}<p>{p.desc}</p>{link&&<a href={p.demoUrl} target="_blank" rel="noreferrer">{c[1]} ↗</a>}</dialog></article>
}
