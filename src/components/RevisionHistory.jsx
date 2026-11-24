import {useEffect,useState} from "react";
import {api} from "../lib/portfolioApi";
export default function RevisionHistory({token,onSaved}){
 const [rows,setRows]=useState([]),[status,setStatus]=useState(""),[busy,setBusy]=useState(false);
 useEffect(()=>{let active=true;api("/rest/v1/portfolio_revisions?select=*&order=created_at.desc&limit=100",{token}).then(r=>{if(active)setRows(r)}).catch(e=>{if(active)setStatus(e.message)});return()=>{active=false}},[token]);
 async function restore(row){if(!window.confirm(row.section+" bo‘limining eski versiyasi nashr qilinsinmi?"))return;setBusy(true);try{await api("/rest/v1/portfolio_content?on_conflict=section",{token,method:"POST",headers:{Prefer:"resolution=merge-duplicates"},body:{section:row.section,content:row.content,updated_at:new Date().toISOString()}});onSaved(row.section,row.content);setRows(await api("/rest/v1/portfolio_revisions?select=*&order=created_at.desc&limit=100",{token}));setStatus("Versiya tiklandi")}catch(e){setStatus(e.message)}finally{setBusy(false)}}
 return <section className="admin-card"><h2>Versiyalar tarixi</h2><p>Oxirgi 100 ta saqlangan versiya.</p>{rows.map(r=><article className="admin-row" key={r.id}><div><strong>{r.section}</strong><p>{new Date(r.created_at).toLocaleString()}</p><details><summary>Kontent</summary><pre style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere"}}>{JSON.stringify(r.content,null,2)}</pre></details></div><button disabled={busy} onClick={()=>restore(r)}>Tiklash</button></article>)}<p role="status">{status}</p></section>
}
