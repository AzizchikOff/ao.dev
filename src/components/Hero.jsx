import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "./Hero.css";

const lineVariants = {
  hidden: { y: "100%" },
  visible: (i) => ({
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export default function Hero() {
  const { t } = useTranslation();
  const stats = t("hero.stats", { returnObjects: true });

  return (
    <section className="hero">
      <div className="wrap">
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="dot" />
          {t("hero.badge")} · {t("hero.location")}
        </motion.div>

        <h1>
          <span className="line-mask">
            <motion.span
              className="line"
              custom={0}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            >
              {t("hero.line1")}
            </motion.span>
          </span>
          <span className="line-mask">
            <motion.span
              className="line"
              custom={1}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            >
              <em>{t("hero.line2em")}</em> {t("hero.line2")}
            </motion.span>
          </span>
          <span className="line-mask">
            <motion.span
              className="line"
              custom={2}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            >
              {t("hero.line3")}
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t("hero.sub")}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="#work" className="btn-primary" data-cursor={t("cursor.down")}>
            {t("hero.ctaPrimary")} <ArrowRight size={15} />
          </a>
          <a href="#contact" className="btn-ghost" data-cursor={t("cursor.write")}>
            {t("hero.ctaGhost")}
          </a>
        </motion.div>

        <motion.div
          className="hero-stack"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {stats.map((s, i) => (
            <div className="stack-item" key={i}>
              <b>{s.value}</b>
              {s.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
