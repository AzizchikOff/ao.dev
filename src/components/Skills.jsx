import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import useReveal from "../hooks/useReveal";
import "./Skills.css";

function SkillCard({ card, index }) {
  const [ref, inView] = useReveal();
  return (
    <motion.div
      className="skill-card"
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="num">{card.num}</div>
      <h3>{card.title}</h3>
      <p>{card.desc}</p>
      <div className="skill-tags">
        {card.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useTranslation();
  const cards = t("skills.cards", { returnObjects: true });

  return (
    <section className="block" id="skills">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag">{t("skills.tag")}</span>
          <div className="sec-line" />
          <h2>{t("skills.title")}</h2>
        </div>

        <div className="skills-grid">
          {cards.map((card, i) => (
            <SkillCard card={card} index={i} key={card.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
