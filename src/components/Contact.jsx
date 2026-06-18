import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import useReveal from "../hooks/useReveal";
import "./Contact.css";

const CHANNELS = [
  { label: "Email", href: "mailto:hello@abdulaziz.dev", display: "hello@abdulaziz.dev" },
  { label: "GitHub", href: "https://github.com/AzizchikOff", display: "GitHub" },
  { label: "LinkedIn", href: "#", display: "LinkedIn" },
  { label: "Telegram", href: "https://t.me/prosto_senior", display: "Telegram" },
];

export default function Contact() {
  const { t } = useTranslation();
  const [ref, inView] = useReveal();

  return (
    <section className="contact-block" id="contact">
      <div className="wrap">
        <span className="sec-tag center">{t("contact.tag")}</span>
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {t("contact.titleLine1")} <br />
          <a href="mailto:hello@abdulaziz.dev" data-cursor="Email">
            {t("contact.titleLine2")}
          </a>
        </motion.h2>

        <div className="contact-channels">
          {CHANNELS.map((c) => (
            <a key={c.label} href={c.href} data-cursor="Ochish">
              {c.display}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
