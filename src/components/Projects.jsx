import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import { projects } from '../data';

function labelForUrl(url) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    if (host.includes('github')) return 'GitHub ↗';
    if (host.includes('devpost')) return 'Devpost ↗';
    if (host.includes('colab.research.google')) return 'Colab ↗';
    return `${host.split('.')[0]} ↗`;
  } catch {
    return 'Link ↗';
  }
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [5, -5]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-160, 160], [-5, 5]), { stiffness: 220, damping: 22 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const links = Array.isArray(project.link) ? project.link : [];

  return (
    <Reveal as="div" delay={index * 0.05} className="project-card-wrap">
      <motion.div
        ref={ref}
        className="project-card"
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-cursor-hover
      >
        <span className="project-card-emoji" aria-hidden="true">{project.emoji}</span>

        <h3>{project.name}</h3>
        <p className="project-desc">{project.description}</p>

        {links.length > 0 && (
          <div className="project-links">
            {links.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="project-link"
                data-cursor-hover
                onClick={(e) => e.stopPropagation()}
              >
                {labelForUrl(url)}
              </a>
            ))}
          </div>
        )}

        <div className="project-card-bottom">
          <div className="project-card-meta">
            <span className="project-tag-small">{project.tag}</span>
            <span className="project-card-date">{project.date}</span>
          </div>

          {project.stack?.length > 0 && (
            <div className="project-stack">
              {project.stack.map((tech) => (
                <span className="tag" key={tech}>{tech}</span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal className="section-head">
        <h2 className="section-heading-accent">Projects</h2>
        <p>Projects to project my success.</p>
      </Reveal>

      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.name} />
        ))}
      </div>
    </section>
  );
}