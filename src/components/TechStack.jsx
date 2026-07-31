import { useState } from 'react';
import Reveal from './Reveal';
import { skills } from '../data';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SIMPLE_ICONS = 'https://cdn.simpleicons.org';

// Devicon-backed icons (official language/tool logos)
const ICON_SLUG = {
  Python: 'python/python-original',
  Java: 'java/java-original',
  C: 'c/c-original',
  'C++': 'cplusplus/cplusplus-original',
  JavaScript: 'javascript/javascript-original',
  HTML: 'html5/html5-original',
  CSS: 'css3/css3-original',
  Bash: 'bash/bash-original',
  Perl: 'perl/perl-original',
  React: 'react/react-original',
  'Node.js': 'nodejs/nodejs-original',
  FastAPI: 'fastapi/fastapi-original',
  Flask: 'flask/flask-original',
  Docker: 'docker/docker-original',
  Git: 'git/git-original',
  Pandas: 'pandas/pandas-original',
  NumPy: 'numpy/numpy-original',
  'Azure DevOps': 'azure/azure-original',
};

// Simple Icons-backed icons (brand logos Devicon doesn't have)
const SIMPLE_ICON_SLUG = {
  DuckDB: 'duckdb',
  Databricks: 'databricks',
  Postman: 'postman',
  Zendesk: 'zendesk',
};

function TechIcon({ name }) {
  const deviconSlug = ICON_SLUG[name];
  const simpleSlug = SIMPLE_ICON_SLUG[name];
  const src = deviconSlug
    ? `${DEVICON}/${deviconSlug}.svg`
    : simpleSlug
    ? `${SIMPLE_ICONS}/${simpleSlug}`
    : null;

  const [failed, setFailed] = useState(!src);

  if (failed) {
    return <span className="tech-chip tech-chip-text">{name}</span>;
  }

  return (
    <span className="tech-chip" data-cursor-hover>
      <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} />
      <span>{name}</span>
    </span>
  );
}

export default function TechStack() {
  return (
    <section id="tech-stack" className="section tech-section">
      <Reveal className="section-head">
        <h2 className="section-heading-accent">My Tech Stack</h2>
        <p>Stacking tech till I reach Stack Overflow.</p>
      </Reveal>

      <div className="tech-groups">
        {skills.map((group, i) => (
          <Reveal as="div" delay={i * 0.06} key={group.label} className="tech-group">
            <span className="tech-group-label">{group.label}</span>
            <div className="tech-chips">
              {group.items.map((item) => (
                <TechIcon name={item} key={item} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}