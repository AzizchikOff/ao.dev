import { useState } from "react";
import { api, configured, listCertificates } from "../lib/portfolioApi";
import "./Admin.css";

const empty = { title: "", issuer: "", issued_on: "", certificate_code: "", credential_url: "", published: false, position: 0 };
export default function Admin() {
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
      setRows(await listCertificates(session.access_token)); setToken(session.access_token);
    });
  }
  async function save(event) {
    event.preventDefault();
    await run(async () => {
      const body = { ...form, issued_on: form.issued_on || null, credential_url: form.credential_url || null };
      await api("/rest/v1/portfolio_certificates" + (editing ? "?id=eq." + encodeURIComponent(editing) : ""), { token, method: editing ? "PATCH" : "POST", body });
      setRows(await listCertificates(token)); setEditing(null); setForm(empty); setStatus("Saqlandi.");
    });
  }
  function edit(row) {
    setEditing(row.id);
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
  const change = (k,v) => setForm(f => ({ ...f, [k]: v }));
  return <main className="admin-shell"><header className="admin-head"><a href="/">AO / Portfolio</a><h1>Admin Dashboard</h1>{token && <button onClick={() => {setToken("");setRows([]);setForm(empty);setEditing(null);setStatus("");}}>Chiqish</button>}</header>
    {!configured ? <p>Supabase environment variables are missing.</p> : !token ? <form className="admin-card" onSubmit={login}><h2>Administrator login</h2><label>Email<input name="email" type="email" autoComplete="username" required /></label><label>Parol<input name="password" type="password" autoComplete="current-password" required /></label><button disabled={busy}>Kirish</button></form> : <>
      <form className="admin-card" onSubmit={save}><h2>{editing ? "Sertifikatni tahrirlash" : "Yangi sertifikat"}</h2>
      { [["title","Nomi","text"],["issuer","Tashkilot","text"],["issued_on","Sana","date"],["certificate_code","Sertifikat kodi","text"],["credential_url","Tasdiqlash URL","url"]].map(([k,label,type]) => <label key={k}>{label}<input type={type} value={form[k]} onChange={e=>change(k,e.target.value)} required={k==="title"||k==="issuer"} /></label>)}
      <label>Tartib<input type="number" value={form.position} onChange={e=>change("position",Number(e.target.value))}/></label>
      <label className="admin-check"><input type="checkbox" checked={form.published} onChange={e=>change("published",e.target.checked)}/>Saytda ko‘rsatish</label>
      <button disabled={busy}>Saqlash</button>{editing && <button type="button" onClick={()=>{setEditing(null);setForm(empty);}}>Bekor qilish</button>}</form>
      <section className="admin-card"><h2>Sertifikatlar ({rows.length})</h2>{rows.map(row=><article className="admin-row" key={row.id}><div><strong>{row.title}</strong><p>{row.issuer} · {row.published?"Nashr qilingan":"Qoralama"}</p></div><button disabled={busy} onClick={()=>edit(row)}>Tahrirlash</button><button disabled={busy} onClick={()=>remove(row.id)}>O‘chirish</button></article>)}</section>
    </>}{status && <p role="status" className="admin-status">{status}</p>}</main>;
}
