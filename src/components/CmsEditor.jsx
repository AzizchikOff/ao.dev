import { useState } from "react";
import { api } from "../lib/portfolioApi";
import uz from "../i18n/locales/uz";
import ru from "../i18n/locales/ru";
import en from "../i18n/locales/en";
import { blogDefaults } from "../lib/blogDefaults";
import { resumeDefaults } from "../lib/resumeDefaults";
const defaults=Object.fromEntries(Object.entries({uz,ru,en}).map(([l,v])=>[l,{...v,blog:blogDefaults[l],resume:resumeDefaults[l]}]));
function Fields({value,onChange,label}){
 if(Array.isArray(value)) return <fieldset><legend>{label}</legend>{value.map((v,i)=><div key={i} className="cms-item"><Fields label={String(i+1)} value={v} onChange={n=>onChange(value.map((x,j)=>j===i?n:x))}/><button type="button" onClick={()=>onChange(value.filter((_,j)=>j!==i))}>O‘chirish</button></div>)}<button type="button" disabled={!value.length} onClick={()=>onChange([...value,structuredClone(value[0])])}>Nusxa qo‘shish</button></fieldset>;
 if(value && typeof value==="object") return <fieldset><legend>{label}</legend>{Object.entries(value).map(([k,v])=><Fields key={k} label={k} value={v} onChange={n=>onChange({...value,[k]:n})}/>)}</fieldset>;
 return <label>{label}<textarea rows={String(value).length>100?4:2} value={value??""} onChange={e=>onChange(e.target.value)}/></label>;
}
export default function CmsEditor({section,token,stored,onSaved}){
 const [lang,setLang]=useState("uz");
 const [draft,setDraft]=useState(()=>Object.fromEntries(Object.keys(defaults).map(l=>[l,stored?.[l]??defaults[l][section]])));
 const [status,setStatus]=useState("");
 const [busy,setBusy]=useState(false);
 async function save(e){e.preventDefault();setBusy(true);setStatus("");try{await api("/rest/v1/portfolio_content?on_conflict=section",{token,method:"POST",headers:{Prefer:"resolution=merge-duplicates"},body:{section,content:draft,updated_at:new Date().toISOString()}});onSaved(section,draft);setStatus("Saqlandi");}catch(e){setStatus(e.message)}finally{setBusy(false)}}
 return <form className="admin-card" onSubmit={save}><h2>{section}</h2><label>Til<select value={lang} onChange={e=>setLang(e.target.value)}><option value="uz">O‘zbek</option><option value="ru">Русский</option><option value="en">English</option></select></label><Fields label="Kontent" value={draft[lang]} onChange={v=>setDraft(d=>({...d,[lang]:v}))}/><button disabled={busy}>Saqlash va nashr qilish</button><p role="status">{status}</p></form>
}
