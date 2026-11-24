import {useState} from "react";
import {api} from "../lib/portfolioApi";
export default function SiteSettings({token,stored,onSaved}){
 const [draft,setDraft]=useState({defaultTheme:"signal",showTerminal:true,showBlog:true,showResume:true,...stored});
 const [status,setStatus]=useState(""),[busy,setBusy]=useState(false);
 async function save(e){e.preventDefault();setBusy(true);try{await api("/rest/v1/portfolio_content?on_conflict=section",{token,method:"POST",headers:{Prefer:"resolution=merge-duplicates"},body:{section:"settings",content:draft,updated_at:new Date().toISOString()}});onSaved("settings",draft);setStatus("Saqlandi")}catch(e){setStatus(e.message)}finally{setBusy(false)}}
 return <form className="admin-card" onSubmit={save}><h2>Dizayn sozlamalari</h2><label>Standart tema<select value={draft.defaultTheme} onChange={e=>setDraft(d=>({...d,defaultTheme:e.target.value}))}>{["signal","ember","violet","paper"].map(t=><option key={t}>{t}</option>)}</select></label>{[["showTerminal","Terminal"],["showBlog","Blog"],["showResume","CV"]].map(([k,v])=><label className="admin-check" key={k}><input type="checkbox" checked={draft[k]} onChange={e=>setDraft(d=>({...d,[k]:e.target.checked}))}/>{v}</label>)}<button disabled={busy}>Saqlash</button><p role="status">{status}</p></form>
}
