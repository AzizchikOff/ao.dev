import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import useReveal from "../hooks/useReveal";
import "./Work.css";

function ProjectRow({ project, flip, viewLabel }) {
  const [ref, inView] = useReveal(0.1);
  return (
    <motion.div
      className={`project ${flip ? "project-row-flip" : ""}`}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="project-visual" data-cursor="Ochish">
        <div className="glow" />
        <span className="mono-tag">{project.file}</span>
      </div>
      <div className="project-body">
        <div className="project-index">{project.index}</div>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a href="#" className="project-link" data-cursor="Ochish">
          {viewLabel} <ArrowUpRight size={15} />
        </a>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const { t } = useTranslation();
  const projects = t("work.projects", { returnObjects: true });

  return (
    <section className="block" id="work">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag">{t("work.tag")}</span>
          <div className="sec-line" />
          <h2>{t("work.title")}</h2>
        </div>

        <div className="project-list">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.index}
              project={project}
              flip={i % 2 === 1}
              viewLabel={t("work.viewProject")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
