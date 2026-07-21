import Reveal from './Reveal';
import { projects } from '../data';

export default function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal className="section-head">
        <span className="eyebrow">Projects</span>
        <h2>Things I've shipped and broken on purpose.</h2>
      </Reveal>

      <div className="project-list">
        {projects.map((project, index) => (
          <Reveal as="div" delay={index * 0.05} key={project.name} className="project-row">
            <div className="project-heading">
              <h3>{project.name}</h3>
              <span className="project-tag">{project.tag}</span>
            </div>
            <p className="project-desc">{project.description}</p>
            <div className="project-meta">
              <span className="timeline-date">{project.date}</span>
              <div className="project-stack">
                {project.stack.map((tech) => (
                  <span className="tag" key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
