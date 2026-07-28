import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import { projects } from '../data';

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

  return (
    <Reveal as="div" delay={index * 0.06} className="project-card-wrap">
      <motion.div
        ref={ref}
        className="project-card"
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-cursor-hover
      >
        <div className="project-card-top">
          <span className="project-card-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="project-tag">{project.tag}</span>
        </div>

        <h3>{project.name}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-card-bottom">
          <div className="project-stack">
            {project.stack.map((tech) => (
              <span className="tag" key={tech}>{tech}</span>
            ))}
          </div>
          <span className="timeline-date">{project.date}</span>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal className="section-head">
        <span className="eyebrow">Projects</span>
        <h2>Things I've shipped and broken on purpose.</h2>
      </Reveal>

      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.name} />
        ))}
      </div>
    </section>
  );
}