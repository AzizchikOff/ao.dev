import { useEffect, useState } from "react";
import { api, configured } from "../lib/portfolioApi";
import { useTranslation } from "react-i18next";
import { Award, CalendarDays, ShieldCheck } from "lucide-react";
import "./Certificates.css";

const initialCertificates = [
  { id: "simplilearn-full-stack-course", name: "Free Full Stack Developer Course", issuer: "Simplilearn SkillUp", date: "2026-10-13", code: "10883781", type: "Course completion" },
  { id: "simplilearn-full-stack-101", name: "Full-Stack Development 101", issuer: "Simplilearn SkillUp", date: "2026-10-12", code: "10879312", type: "Course completion" },
  { id: "hackerrank-javascript-basic", name: "JavaScript (Basic)", issuer: "HackerRank", date: "2026-10-12", code: "746DCF578CE5", type: "Skills certification" },
  { id: "simplilearn-python", name: "Programming with Python 3.X", issuer: "Simplilearn SkillUp", date: "2026-10-17", code: "10904539", type: "Course completion" },
];

const copy = {
  uz: { tag: "Sertifikatlar", title: "Sertifikatlar va yutuqlar", intro: "Abdulaziz Orifov nomiga berilgan 4 ta sertifikat. Kodlar yuklangan hujjatlardan olingan; tashqi tekshiruv hali amalga oshirilmagan.", issued: "Berilgan sana", code: "Sertifikat kodi", type: "Turi" },
  ru: { tag: "Сертификаты", title: "Сертификаты и достижения", intro: "Четыре сертификата на имя Abdulaziz Orifov. Коды взяты из документов; независимая проверка ещё не проведена.", issued: "Дата выдачи", code: "Код сертификата", type: "Тип" },
  en: { tag: "Certificates", title: "Certificates & achievements", intro: "Four certificates issued to Abdulaziz Orifov. Codes are transcribed from the supplied documents; independent verification has not yet been performed.", issued: "Issued", code: "Certificate code", type: "Type" },
};

export default function Certificates() {
  const [certificates,setCertificates]=useState(configured?[]:initialCertificates);
  const [error,setError]=useState("");
  useEffect(()=>{if(configured) api("/rest/v1/portfolio_certificates?published=eq.true&select=*&order=position.asc").then(rows=>setCertificates(rows.map(r=>({...r,name:r.title,date:r.issued_on,code:r.certificate_code})))).catch(()=>setError("Certificates unavailable"));},[]);
  async function openPdf(path){try{const data=await api("/storage/v1/object/sign/portfolio-certificates/"+encodeURIComponent(path),{method:"POST",body:{expiresIn:60}});const url=import.meta.env.VITE_SUPABASE_URL.replace(/\/$/,"");const signed=data.signedURL;if(typeof signed!=="string"||!signed.startsWith("/"))throw new Error("Invalid PDF link");window.location.assign(url+(signed.startsWith("/storage/v1/")?"":"/storage/v1")+signed);}catch(e){setError(e.message);}}
  const { i18n } = useTranslation();
  const t = copy[i18n.language?.slice(0, 2)] || copy.uz;
  return <section className="block certificates-section" id="certificates"><div className="wrap">
    <div className="sec-head"><span className="sec-tag">007 / {t.tag}</span><div className="sec-line" /><h2>{t.title}</h2></div>
    <p className="certificates-intro">{error || (certificates.length ? "" : "—")}</p>
    <div className="certificates-grid">{certificates.map(cert => <article className="certificate-card" key={cert.id}>
      <div className="certificate-top"><Award size={27} aria-hidden="true" /><span>{cert.issuer}</span></div>
      <h3>{cert.name}</h3>
      {cert.type && <p className="certificate-type"><ShieldCheck size={15} aria-hidden="true" /> {t.type}: {cert.type}</p>}
      {cert.file_path && <button type="button" onClick={()=>openPdf(cert.file_path)}>PDF ↗</button>}
      <div className="certificate-meta"><span><CalendarDays size={15} aria-hidden="true" />{t.issued}: <time dateTime={cert.date}>{cert.date}</time></span><span>{t.code}: <code>{cert.code}</code></span></div>
    </article>)}</div>
  </div></section>;
}
