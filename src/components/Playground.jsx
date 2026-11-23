import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw, Shuffle } from "lucide-react";
import "./Playground.css";

const initial = [46, 18, 82, 33, 67, 25, 91, 54];
const labels = {
  uz: {tag:"INTERAKTIV LABORATORIYA",title:"Playground",desc:"Saralash algoritmini jonli ko‘ring. Har bir qadamni o‘zingiz boshqaring.",next:"Keyingi qadam",reset:"Qayta boshlash",shuffle:"Aralashtirish",done:"Saralash yakunlandi",step:"Qadam"},
  ru: {tag:"ИНТЕРАКТИВНАЯ ЛАБОРАТОРИЯ",title:"Playground",desc:"Посмотрите алгоритм сортировки в действии. Управляйте каждым шагом.",next:"Следующий шаг",reset:"Сначала",shuffle:"Перемешать",done:"Сортировка завершена",step:"Шаг"},
  en: {tag:"INTERACTIVE LAB",title:"Playground",desc:"Explore a sorting algorithm in action. Control every step.",next:"Next step",reset:"Reset",shuffle:"Shuffle",done:"Sorting complete",step:"Step"}
};
function nextBubble(values, index) {
  const next = [...values];
  const i = index % (next.length - 1);
  if (next[i] > next[i + 1]) [next[i], next[i + 1]] = [next[i + 1], next[i]];
  return next;
}
export default function Playground() {
  const [values, setValues] = useState(initial);
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0,2) || "uz";
  const t = labels[lang] || labels.uz;
  const total = values.length * (values.length - 1);
  const done = step >= total;
  const advance = () => {
    if (done) return;
    setValues(v => nextBubble(v, step));
    setStep(s => s + 1);
  };
  const reset = (shuffle = false) => {
    setValues(shuffle ? [...initial].map(value => ({ value, order: Math.random() })).sort((a,b) => a.order-b.order).map(item => item.value) : initial);
    setStep(0);
  };
  return <section className="block lab-section" id="playground">
    <div className="wrap">
      <div className="sec-head"><span className="sec-tag">{t.tag}</span><div className="sec-line"/><h2>{t.title}</h2></div>
      <p className="lab-description">{t.desc}</p>
      <div className="lab-panel">
        <div className="lab-meta"><span>Bubble Sort · O(n²)</span><span aria-live="polite">{done ? t.done : `${t.step}: ${step}`}</span></div>
        <div className="lab-bars" role="img" aria-label={`Array: ${values.join(", ")}`}>
          {values.map((value, i) => <motion.div key={value} layout={!reduceMotion} transition={{duration:0.25}} className={i === step % (values.length - 1) && !done ? "lab-bar active" : "lab-bar"} style={{height:`${value}%`}}><span>{value}</span></motion.div>)}
        </div>
        <div className="lab-actions">
          <button className="btn-primary" onClick={advance} disabled={done}>{t.next}</button>
          <button className="btn-ghost" onClick={() => reset(false)}><RotateCcw size={15}/>{t.reset}</button>
          <button className="btn-ghost" onClick={() => reset(true)}><Shuffle size={15}/>{t.shuffle}</button>
        </div>
      </div>
      <p className="lab-description">Source: <a href="https://github.com/AzizchikOff/ao.dev/blob/feature/portfolio-tz/src/components/Playground.jsx" target="_blank" rel="noreferrer">GitHub</a></p>
    </div>
  </section>;
}
