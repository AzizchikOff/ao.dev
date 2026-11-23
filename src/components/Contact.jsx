import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import useReveal from "../hooks/useReveal";
import "./Contact.css";

const CHANNELS = [
  { label: "GitHub", href: "https://github.com/AzizchikOff", display: "GitHub" },
  { label: "Telegram", href: "https://t.me/prosto_senior", display: "Telegram" },
];
const labels = {
  uz: { name:"Ismingiz", email:"Email manzilingiz", message:"Xabaringiz", send:"Xabar yuborish", sending:"Yuborilmoqda…", success:"Xabar qabul qilindi. Tez orada javob beramiz.", error:"Xabar yuborilmadi. Telegram orqali bog‘laning.", form:"Bog‘lanish formasi" },
  ru: { name:"Ваше имя", email:"Ваш email", message:"Сообщение", send:"Отправить", sending:"Отправка…", success:"Сообщение получено. Мы скоро ответим.", error:"Не удалось отправить. Напишите в Telegram.", form:"Форма связи" },
  en: { name:"Your name", email:"Your email", message:"Your message", send:"Send message", sending:"Sending…", success:"Message received. We'll get back to you soon.", error:"Could not send. Please contact via Telegram.", form:"Contact form" },
};
export default function Contact() {
  const { t, i18n } = useTranslation();
  const [ref, inView] = useReveal();
  const [status, setStatus] = useState("idle");
  const copy = labels[i18n.language?.slice(0, 2)] || labels.uz;
  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch("/", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body:new URLSearchParams(data).toString() });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }
  return <section className="contact-block" id="contact"><div className="wrap">
    <span className="sec-tag center">{t("contact.tag")}</span>
    <motion.h2 ref={ref} initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7}}>
      {t("contact.titleLine1")} <br/><a href="https://t.me/prosto_senior" data-cursor="Telegram">{t("contact.titleLine2")}</a>
    </motion.h2>
    <form className="contact-form" name="portfolio-contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} aria-label={copy.form}>
      <input type="hidden" name="form-name" value="portfolio-contact"/>
      <p className="contact-honeypot"><label>Do not fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off"/></label></p>
      <div className="contact-form-row">
        <label>{copy.name}<input name="name" required minLength={2} maxLength={100} autoComplete="name"/></label>
        <label>{copy.email}<input name="email" type="email" required maxLength={200} autoComplete="email"/></label>
      </div>
      <label>{copy.message}<textarea name="message" required minLength={10} maxLength={5000} rows={5}/></label>
      <button className="contact-submit" type="submit" disabled={status==="sending"}>{status==="sending"?copy.sending:copy.send}</button>
      <p role="status" aria-live="polite" className="contact-status">{status==="success"?copy.success:status==="error"?copy.error:""}</p>
    </form>
    <div className="contact-channels">{CHANNELS.map(c=><a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" data-cursor="Ochish">{c.display}</a>)}</div>
  </div></section>;
}
