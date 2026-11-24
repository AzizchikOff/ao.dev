import {Code2} from "lucide-react";
const brands={react:["react","#61dafb"],javascript:["javascript","#f7df1e"],typescript:["typescript","#3178c6"],html:["html5","#e34f26"],html5:["html5","#e34f26"],css:["css3","#1572b6"],css3:["css3","#1572b6"],"node.js":["nodejs","#83cd29"],nodejs:["nodejs","#83cd29"],python:["python","#3776ab"],git:["git","#f05032"],github:["github","#ffffff"],tailwind:["tailwindcss","#38bdf8"],tailwindcss:["tailwindcss","#38bdf8"],vite:["vitejs","#a78bfa"],figma:["figma","#f24e1e"],supabase:["supabase","#3ecf8e"],postgresql:["postgresql","#4169e1"],express:["express","#dddddd"]};
export default function TechIcon({name}){
 const key=String(name).toLowerCase().trim();const brand=brands[key];
 return brand?<img className="tech-brand-icon" src={"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/"+brand[0]+"/"+brand[0]+"-original.svg"} alt="" width="28" height="28" loading="lazy" onError={e=>{e.currentTarget.hidden=true}}/>:<Code2 size={26}/>;
}
