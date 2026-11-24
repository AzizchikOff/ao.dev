import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import "./Editorial.css";

import { blogDefaults } from "../lib/blogDefaults";
export default function Blog(){
 const {i18n,t}=useTranslation();const lang=i18n.language?.slice(0,2);const copy=t("blog",{returnObjects:true,defaultValue:blogDefaults[lang]||blogDefaults.uz});const posts=copy.posts;
 const [selected,setSelected]=useState(null);
 const article=posts.find(p=>p.id===selected);
 return <section className="block editorial" id="blog"><div className="wrap">
  <div className="sec-head"><span className="sec-tag">{copy.tag}</span><div className="sec-line"/><h2>{copy.title}</h2></div>
  {article?<article className="editorial-article"><button className="editorial-back" onClick={()=>setSelected(null)}><ArrowLeft size={17}/>{copy.back}</button><span className="editorial-meta">{article.date} · {article.read}</span><h3>{article.title}</h3><p className="editorial-lead">{article.intro}</p>{article.sections.map(([heading,body])=><div key={heading}><h4>{heading}</h4><p>{body}</p></div>)}</article>:
  <><p className="editorial-lead">{copy.desc}</p><div className="editorial-grid">{posts.map(p=><article className="editorial-card" key={p.id}><span className="editorial-meta">{p.date} · {p.read}</span><h3>{p.title}</h3><p>{p.intro}</p><button onClick={()=>setSelected(p.id)}>{copy.read}<ArrowUpRight size={16}/></button></article>)}</div></>}
 </div></section>;
}
