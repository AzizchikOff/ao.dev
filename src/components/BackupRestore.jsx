import {useState} from "react";
import {api} from "../lib/portfolioApi";
const allowed=new Set(["hero","about","skills","work","experience","contact","footer","blog","resume","settings"]);
const object=v=>v!==null&&typeof v==="object"&&!Array.isArray(v);
export default function BackupRestore({token,onSaved}){
 const [data,setData]=useState(null),[status,setStatus]=useState(""),[busy,setBusy]=useState(false);
 async function read(e){setData(null);setStatus("");try{const file=e.target.files[0];if(!file)return;if(file.size>2097152)throw new Error("JSON 2 MB dan oshmasligi kerak");const parsed=JSON.parse(await file.text());if(parsed.version!==1||!object(parsed.content))throw new Error("Backup formati noto‘g‘ri");const entries=Object.entries(parsed.content);if(!entries.length||entries.some(([k,v])=>!allowed.has(k)||!object(v)||(k!=="settings"&&["uz","ru","en"].some(l=>!object(v[l])))))throw new Error("CMS bo‘limlari noto‘g‘ri");setData(parsed.content)}catch(e){setStatus(e.message)}}
 async function restore(){if(!data||!window.confirm("Tanlangan CMS bo‘limlari almashtiriladi va nashr qilinadi. Davom etilsinmi?"))return;setBusy(true);try{await api("/rest/v1/portfolio_content?on_conflict=section",{token,method:"POST",headers:{Prefer:"resolution=merge-duplicates"},body:Object.entries(data).map(([section,content])=>({section,content,updated_at:new Date().toISOString()}))});onSaved(data);setData(null);setStatus("CMS tiklandi")}catch(e){setStatus(e.message)}finally{setBusy(false)}}
 return <section className="admin-card"><h2>Backup Restore</h2><p>Faqat CMS kontenti tiklanadi. Sertifikatlar va media fayllari o‘zgarmaydi. Faqat ishonchli, o‘zingiz eksport qilgan faylni tanlang.</p><input type="file" accept=".json,application/json" disabled={busy} onChange={read}/>{data&&<><p>Tiklanadigan bo‘limlar: {Object.keys(data).join(", ")}</p><button disabled={busy} onClick={restore}>Tiklash va nashr qilish</button></>}<p role="status">{status}</p></section>
}
