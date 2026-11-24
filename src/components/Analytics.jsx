import {useEffect,useState} from "react";
import {api} from "../lib/portfolioApi";
export default function Analytics({token}){
 const [rows,setRows]=useState([]),[status,setStatus]=useState("");
 useEffect(()=>{let active=true;api("/rest/v1/portfolio_views?select=day,views&order=day.desc&limit=30",{token}).then(r=>{if(active)setRows(r)}).catch(e=>{if(active)setStatus(e.message)});return()=>{active=false}},[token]);
 const max=Math.max(1,...rows.map(r=>Number(r.views)));
 return <section className="admin-card"><h2>Analytics</h2><p>Oxirgi 30 ta faol kun. Sahifa yuklanishlari, noyob tashrifchilar emas. Botlar ham hisoblanishi mumkin.</p><div className="admin-metrics"><article><span>Jami ko‘rishlar</span><strong>{rows.reduce((a,r)=>a+Number(r.views),0)}</strong></article></div>{[...rows].reverse().map(r=><div key={r.day}><span>{r.day} — {r.views}</span><div style={{height:10,borderRadius:8,background:"var(--accent)",width:(Number(r.views)/max*100)+"%"}}/></div>)}<p role="status">{status}</p></section>
}
