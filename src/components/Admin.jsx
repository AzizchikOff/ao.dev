import { useState } from "react";
import { LayoutDashboard, Award, Image, Eye, Settings, History, BarChart3, Download, Upload, Home, User, Code2, Layers, Briefcase, Mail, FileText } from "lucide-react";
import { api, configured, listCertificates } from "../lib/portfolioApi";
import "./Admin.css";
import BackupRestore from "./BackupRestore";
import Analytics from "./Analytics";
import RevisionHistory from "./RevisionHistory";
import SiteSettings from "./SiteSettings";
import MediaLibrary from "./MediaLibrary";
import CmsEditor from "./CmsEditor";
const icons={hero:Home,about:User,skills:Code2,work:Layers,experience:Briefcase,contact:Mail,footer:Layers,blog:FileText,resume:FileText};
const sections={hero:"Bosh sahifa",about:"O‘zim haqimda",skills:"Ko‘nikmalar",work:"Loyihalar",experience:"Tajriba",contact:"Kontaktlar",footer:"Footer",blog:"Blog",resume:"CV"};

const empty = { title: "", issuer: "", issued_on: "", certificate_code: "", credential_url: "", published: false, position: 0 };
export default function Admin() {
  const [cms,setCms]=useState({});
  const [tab, setTab] = useState("dashboard");
  const [dirty,setDirty]=useState(false);
  function navigate(next){if(next===tab)return;if(dirty&&!window.confirm("Saqlanmagan o‘zgarishlar bor. Bo‘limdan chiqasizmi?"))return;setDirty(false);setTab(next);}
  const [file, setFile] = useState(null);
  const [token, setToken] = useState("");
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function run(fn) {
    setBusy(true); setStatus("");
    try { await fn(); } catch (e) { setStatus(e.message); } finally { setBusy(false); }
  }
  async function login(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    await run(async () => {
      const session = await api("/auth/v1/token?grant_type=password", { method: "POST", body: { email: fields.get("email"), password: fields.get("password") } });
      const allowed = await api("/rest/v1/rpc/is_portfolio_admin", { method: "POST", token: session.access_token, body: {} });
      if (allowed !== true) throw new Error("Administrator access denied.");
      const content=await api("/rest/v1/portfolio_content?select=section,content",{token:session.access_token}); setCms(Object.fromEntries(content.map(r=>[r.section,r.content])));
      setRows(await listCertificates(session.access_token)); setToken(session.access_token);
    });
  }
  async function save(event) {
    event.preventDefault();
    await run(async () => {
      const body = { ...form, issued_on: form.issued_on || null, credential_url: form.credential_url || null };
      if (file) {
        if (file.type !== "application/pdf" || file.size > 10485760) throw new Error("PDF fayl 10 MB dan oshmasligi kerak.");
        const path = crypto.randomUUID() + ".pdf";
        await api("/storage/v1/object/portfolio-certificates/" + path, { token, method: "POST", body: file, headers: {"Content-Type":"application/pdf"} });
        body.file_path = path;
      }
      await api("/rest/v1/portfolio_certificates" + (editing ? "?id=eq." + encodeURIComponent(editing) : ""), { token, method: editing ? "PATCH" : "POST", body });
      setRows(await listCertificates(token)); setEditing(null); setForm(empty); setFile(null); setStatus("Saqlandi.");
    });
  }
  function edit(row) {
    setEditing(row.id); setFile(null);
    setForm(Object.fromEntries(Object.keys(empty).map(k => [k, row[k] ?? empty[k]])));
  }
  async function remove(id) {
    if (!window.confirm("Sertifikat o‘chirilsinmi?")) return;
    await run(async () => {
      await api("/rest/v1/portfolio_certificates?id=eq." + encodeURIComponent(id), { token, method: "DELETE" });
      setRows(await listCertificates(token)); setStatus("O‘chirildi.");
      if (editing === id) { setEditing(null); setForm(empty); }
    });
  }
  function backup(){const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),content:cms,certificates:rows},null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="ao-portfolio-backup-"+new Date().toISOString().slice(0,10)+".json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  const change = (k,v) => setForm(f => ({ ...f, [k]: v }));
  return <main className="admin-shell"><header className="admin-head"><a href="/" className="admin-brand"><b>AO</b><span>Portfolio CMS<small>Abdulaziz Orifov</small></span></a><h1>Admin Dashboard</h1>{token&&<a className="admin-preview-link" href="/" target="_blank" rel="noreferrer"><Eye size={18}/> Saytni ko‘rish</a>}{token && <button onClick={() => {if(dirty&&!window.confirm("Saqlanmagan o‘zgarishlar bor. Chiqasizmi?"))return;setDirty(false);setToken("");setCms({});setFile(null);setTab("dashboard");setRows([]);setForm(empty);setEditing(null);setStatus("");}}>Chiqish</button>}</header>
    {!configured ? <p>Supabase environment variables are missing.</p> : !token ? <form className="admin-card" onSubmit={login}><h2>Administrator login</h2><label>Email<input name="email" type="email" autoComplete="username" required /></label><label>Parol<input name="password" type="password" autoComplete="current-password" required /></label><button disabled={busy}>Kirish</button></form> : <div className="admin-layout"><aside className="admin-sidebar"><button aria-current={tab==="dashboard"?"page":undefined} onClick={()=>navigate("dashboard")}><LayoutDashboard size={18}/> Dashboard</button><button aria-current={tab==="certificates"?"page":undefined} onClick={()=>navigate("certificates")}><Award size={18}/> Sertifikatlar</button><button aria-current={tab==="media"?"page":undefined} onClick={()=>navigate("media")}><Image size={18}/> Media kutubxonasi</button><button onClick={()=>navigate("preview")}><Eye size={18}/> Saytni ko‘rish</button><button onClick={()=>navigate("settings")}><Settings size={18}/> Dizayn sozlamalari</button><button onClick={()=>navigate("history")}><History size={18}/> Versiyalar tarixi</button><button onClick={()=>navigate("analytics")}><BarChart3 size={18}/> Analytics</button><button onClick={backup}><Download size={18}/> Zaxira nusxasini olish</button><button onClick={()=>navigate("restore")}><Upload size={18}/> Zaxiradan tiklash</button>{Object.entries(sections).map(([k,v])=>{const Icon=icons[k];return <button key={k} aria-current={tab===k?"page":undefined} onClick={()=>navigate(k)}><Icon size={18}/> {v}</button>})}</aside><div className="admin-main">{tab==="restore"?<BackupRestore token={token} onSaved={v=>setCms(c=>({...c,...v}))}/>:tab==="analytics"?<Analytics token={token}/>:tab==="history"?<RevisionHistory token={token} onSaved={(k,v)=>setCms(c=>({...c,[k]:v}))}/>:tab==="settings"?<SiteSettings token={token} stored={cms.settings} onSaved={(k,v)=>setCms(c=>({...c,[k]:v}))}/>:tab==="media"?<MediaLibrary token={token}/>:tab==="preview"?<section className="admin-card"><h2>Sayt ko‘rinishi</h2><a href="/" target="_blank" rel="noreferrer">Yangi oynada ochish</a><iframe title="Published portfolio preview" src="/" style={{width:"100%",height:"75vh",border:0}}/></section>:tab === "dashboard" ? <section className="admin-card admin-dashboard"><h2>Xush kelibsiz, Abdulaziz Orifov</h2><p>Portfolio CMS — saytingizni boshqaring va yangilang.</p><div className="admin-metrics"><article><span>Sertifikatlar</span><strong>{rows.length}</strong></article><article><span>Nashr qilingan</span><strong>{rows.filter(r=>r.published).length}</strong></article><article><span>PDF fayllar</span><strong>{rows.filter(r=>r.file_path).length}</strong></article><article><span>CMS bo‘limlari</span><strong>{Object.keys(cms).length}</strong></article></div><h3>Tezkor amallar</h3><div className="admin-quick">{[["hero","Bosh sahifani tahrirlash"],["about","Profilni yangilash"],["work","Loyihalarni boshqarish"],["certificates","Sertifikatlarni boshqarish"],["media","Fayl yuklash"],["preview","Saytni ko‘rish"]].map(([key,label])=><button key={key} onClick={()=>navigate(key)}>{label}</button>)}</div><div className="admin-dashboard-grid"><div><Analytics token={token}/></div><div className="admin-dashboard-side"><section className="admin-card"><h3>So‘nggi sertifikatlar</h3>{rows.slice(0,4).map(r=><p key={r.id}>{r.title}</p>)}<button onClick={()=>navigate("certificates")}>Barchasi</button></section><section className="admin-card"><h3>Zaxira nusxasi</h3><button onClick={backup}>Yuklab olish</button></section></div><div><MediaLibrary token={token}/></div><div><RevisionHistory token={token} onSaved={(k,v)=>setCms(c=>({...c,[k]:v}))}/></div><section className="admin-card admin-dashboard-preview"><h3>Saytni jonli ko‘rish</h3><iframe title="Portfolio preview" src="/" loading="lazy"/><button onClick={()=>navigate("preview")}>Live Preview</button></section></div></section> : tab !== "certificates" ? <CmsEditor onDirty={setDirty} key={tab} section={tab} token={token} stored={cms[tab]} onSaved={(k,v)=>setCms(c=>({...c,[k]:v}))}/> : <>
      <form className="admin-card" onSubmit={save}><h2>{editing ? "Sertifikatni tahrirlash" : "Yangi sertifikat"}</h2>
      { [["title","Nomi","text"],["issuer","Tashkilot","text"],["issued_on","Sana","date"],["certificate_code","Sertifikat kodi","text"],["credential_url","Tasdiqlash URL","url"]].map(([k,label,type]) => <label key={k}>{label}<input type={type} value={form[k]} onChange={e=>change(k,e.target.value)} required={k==="title"||k==="issuer"} /></label>)}
      <label>PDF fayl (10 MB gacha)<input key={editing || "new"} type="file" accept="application/pdf" onChange={e=>setFile(e.target.files[0] || null)}/></label>
      <label>Tartib<input type="number" value={form.position} onChange={e=>change("position",Number(e.target.value))}/></label>
      <label className="admin-check"><input type="checkbox" checked={form.published} onChange={e=>change("published",e.target.checked)}/>Saytda ko‘rsatish</label>
      <button disabled={busy}>Saqlash</button>{editing && <button type="button" onClick={()=>{setEditing(null);setForm(empty);setFile(null);}}>Bekor qilish</button>}</form>
      <section className="admin-card"><h2>Sertifikatlar ({rows.length})</h2>{rows.map(row=><article className="admin-row" key={row.id}><div><strong>{row.title}</strong><p>{row.issuer} · {row.published?"Nashr qilingan":"Qoralama"}</p></div><button disabled={busy} onClick={()=>edit(row)}>Tahrirlash</button><button disabled={busy} onClick={()=>remove(row.id)}>O‘chirish</button></article>)}</section>
    </>}</div></div>}{status && <p role="status" className="admin-status">{status}</p>}</main>;
}
