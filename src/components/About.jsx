import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import useReveal from "../hooks/useReveal";
import RichText from "./RichText";
import "./About.css";

export default function About() {
  const { t } = useTranslation();
  const [textRef, textIn] = useReveal();
  const [metaRef, metaIn] = useReveal();

  const meta = t("about.meta", { returnObjects: true });

  const metaRows = [
    [meta.location, meta.locationVal],
    [meta.experience, meta.experienceVal],
    [meta.direction, meta.directionVal],
    [meta.stack, meta.stackVal],
  ];

  return (
    <section className="block" id="about">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag">{t("about.tag")}</span>
          <div className="sec-line" />
          <h2>{t("about.title")}</h2>
        </div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            ref={textRef}
            initial={{ opacity: 0, y: 24 }}
            animate={textIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p><RichText text={t("about.p1")} /></p>
            <p><RichText text={t("about.p2")} /></p>
            <p><RichText text={t("about.p3")} /></p>
          </motion.div>

          <motion.div
            className="about-meta"
            ref={metaRef}
            initial={{ opacity: 0, y: 24 }}
            animate={metaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {metaRows.map(([label, val], i) => (
              <div className="meta-row" key={i}>
                <span>{label}</span>
                <span>{val}</span>
              </div>
            ))}
            <div className="meta-row">
              <span>{meta.status}</span>
              <span className="status-available">{meta.statusVal}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
