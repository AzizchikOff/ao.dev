import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import "./Editorial.css";

const articles = {
  uz: [
    {id:"react-component-design",date:"2026",read:"5 daqiqa",title:"React komponentlarini qayta foydalanishga mos loyihalash",intro:"Katta interfeyslarni kichik va tushunarli qismlarga ajratish yondashuvi.",sections:[["Komponent chegaralari","Har bir komponent bitta aniq vazifani bajarsin. Takrorlanuvchi UI elementlarni ajrating, lekin har bir kichik div uchun alohida komponent yaratishga shoshilmang."],["Ma’lumot oqimi","State faqat zarur bo‘lgan joyda tursin. Bir nechta komponentga kerak bo‘lsa, eng yaqin umumiy ota komponentga ko‘taring."],["Amaliy qoida","Props nomlarini tushunarli yozing, interaktiv elementlarga semantik HTML qo‘llang va klaviatura orqali boshqarishni sinab ko‘ring."]]},
    {id:"vite-performance",date:"2026",read:"4 daqiqa",title:"Vite loyihasida tezlikni yaxshilash",intro:"Kichik o‘zgarishlar orqali sahifa yuklanishini yengillashtirish.",sections:[["Dastlab o‘lchash","Optimallashtirishdan oldin Lighthouse va brauzer Performance panelida sekin joylarni aniqlang."],["Kodlarni bo‘lish","Katta yoki kam ishlatiladigan komponentlarni React.lazy orqali keyinroq yuklash mumkin."],["Media va shriftlar","Rasmlarning o‘lchamlarini belgilang, zamonaviy formatlardan foydalaning va kerakli shrift og‘irliklarinigina yuklang."]]},
    {id:"accessible-ui",date:"2026",read:"4 daqiqa",title:"Accessibility: yaxshi UI ning ajralmas qismi",intro:"Klaviatura, kontrast va tushunarli interfeys haqida.",sections:[["Semantik elementlar","Navigatsiya uchun a, amallar uchun button va ma’lumot kiritish uchun label bilan bog‘langan input ishlating."],["Fokus boshqaruvi","Modal oynalarda fokusni boshqaring, Escape bilan yopishni qo‘llang va ko‘rinadigan fokus uslubini saqlang."],["Harakatni kamaytirish","prefers-reduced-motion sozlamasini hurmat qiling va asosiy kontentni animatsiyaga bog‘lamang."]]}
  ],
  en: [],
  ru: []
};
const ui={
 uz:{tag:"005 / Maqolalar",title:"Blog",desc:"Frontend va web development bo‘yicha qisqa texnik yozuvlar.",read:"O‘qish",back:"Barcha maqolalar",note:"Texnik o‘quv maqolalari"},
 en:{tag:"005 / Articles",title:"Blog",desc:"Short technical notes about frontend and web development.",read:"Read article",back:"All articles",note:"Technical learning articles"},
 ru:{tag:"005 / Статьи",title:"Блог",desc:"Короткие технические заметки о фронтенде и веб-разработке.",read:"Читать",back:"Все статьи",note:"Обучающие технические статьи"}
};
const en=[
 {id:"react-component-design",date:"2026",read:"5 min",title:"Designing reusable React components",intro:"How to split complex interfaces into maintainable pieces.",sections:[["Component boundaries","Give each component a clear responsibility. Extract repeated interface patterns without creating a component for every div."],["Data flow","Keep state near the components that use it. Lift shared state to the closest common parent."],["Practical habits","Use descriptive props, semantic HTML and test all interactions with a keyboard."]]},
 {id:"vite-performance",date:"2026",read:"4 min",title:"Improving performance in Vite apps",intro:"Small changes that help pages load faster.",sections:[["Measure first","Use Lighthouse and the browser Performance panel to identify bottlenecks before optimizing."],["Split code","Lazy-load larger features that are not needed on the initial page."],["Images and fonts","Set image dimensions, choose efficient formats and avoid loading unnecessary font weights."]]},
 {id:"accessible-ui",date:"2026",read:"4 min",title:"Accessibility is part of good UI",intro:"Keyboard navigation, contrast and understandable interfaces.",sections:[["Semantic elements","Use links for navigation, buttons for actions and labels for form inputs."],["Focus","Manage focus in dialogs, support Escape and preserve a visible focus indicator."],["Reduced motion","Respect prefers-reduced-motion and keep content accessible without animation."]]}
];
const ru=[
 {id:"react-component-design",date:"2026",read:"5 мин",title:"Проектирование переиспользуемых React-компонентов",intro:"Как разбить сложный интерфейс на поддерживаемые части.",sections:[["Границы компонентов","У каждого компонента должна быть понятная задача. Выделяйте повторяющиеся элементы интерфейса."],["Поток данных","Храните состояние рядом с теми компонентами, которым оно нужно. Общее состояние поднимайте к ближайшему общему родителю."],["Практика","Используйте понятные props, семантический HTML и проверяйте управление с клавиатуры."]]},
 {id:"vite-performance",date:"2026",read:"4 мин",title:"Оптимизация производительности Vite-приложений",intro:"Небольшие улучшения для быстрой загрузки страниц.",sections:[["Сначала измерьте","Используйте Lighthouse и Performance в браузере, чтобы найти узкие места."],["Разделение кода","Загружайте тяжёлые компоненты только при необходимости."],["Изображения и шрифты","Указывайте размеры изображений и загружайте только необходимые начертания шрифтов."]]},
 {id:"accessible-ui",date:"2026",read:"4 мин",title:"Доступность — часть хорошего интерфейса",intro:"Клавиатура, контраст и понятные элементы управления.",sections:[["Семантика","Используйте ссылки для навигации, кнопки для действий и label для полей формы."],["Фокус","Управляйте фокусом в диалогах и поддерживайте Escape."],["Анимации","Уважайте prefers-reduced-motion и не скрывайте контент за анимацией."]]}
];
articles.en=en;articles.ru=ru;
export default function Blog(){
 const {i18n}=useTranslation();const lang=i18n.language?.slice(0,2);const copy=ui[lang]||ui.uz;const posts=articles[lang]||articles.uz;
 const [selected,setSelected]=useState(null);
 const article=posts.find(p=>p.id===selected);
 return <section className="block editorial" id="blog"><div className="wrap">
  <div className="sec-head"><span className="sec-tag">{copy.tag}</span><div className="sec-line"/><h2>{copy.title}</h2></div>
  {article?<article className="editorial-article"><button className="editorial-back" onClick={()=>setSelected(null)}><ArrowLeft size={17}/>{copy.back}</button><span className="editorial-meta">{article.date} · {article.read}</span><h3>{article.title}</h3><p className="editorial-lead">{article.intro}</p>{article.sections.map(([heading,body])=><div key={heading}><h4>{heading}</h4><p>{body}</p></div>)}</article>:
  <><p className="editorial-lead">{copy.desc}</p><div className="editorial-grid">{posts.map(p=><article className="editorial-card" key={p.id}><span className="editorial-meta">{p.date} · {p.read}</span><h3>{p.title}</h3><p>{p.intro}</p><button onClick={()=>setSelected(p.id)}>{copy.read}<ArrowUpRight size={16}/></button></article>)}</div></>}
 </div></section>;
}
