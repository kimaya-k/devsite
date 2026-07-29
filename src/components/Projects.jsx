import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import { projects } from '../data';

<motion.div
  ref={ref}
  className="project-card"
  style={{ rotateX, rotateY, transformPerspective: 900 }}
  onMouseMove={handleMove}
  onMouseLeave={handleLeave}
  data-cursor-hover
>
  {project.image && (
    <div className="project-card-image">
      <img src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`} alt="" />
    </div>
  )}

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

export default function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal className="section-head">
        <h2 className="projects-heading">Projects</h2>
      </Reveal>

      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.name} />
        ))}
      </div>
    </section>
  );
}