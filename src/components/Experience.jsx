import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import useReveal from "../hooks/useReveal";
import "./Experience.css";

function TimelineRow({ item, index }) {
  const [ref, inView] = useReveal();
  return (
    <motion.div
      className="tl-row"
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <div className="tl-date">{item.date}</div>
      <div className="tl-role">
        <h4>{item.role}</h4>
        <span>{item.place}</span>
      </div>
      <div className="tl-arrow">→</div>
    </motion.div>
  );
}

export default function Experience() {
  const { t } = useTranslation();
  const items = t("experience.items", { returnObjects: true });

  return (
    <section className="block" id="experience">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag">{t("experience.tag")}</span>
          <div className="sec-line" />
          <h2>{t("experience.title")}</h2>
        </div>

        <div className="timeline">
          {items.map((item, i) => (
            <TimelineRow item={item} index={i} key={item.role} />
          ))}
        </div>
      </div>
    </section>
  );
}
