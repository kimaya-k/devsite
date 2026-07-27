import { useState } from 'react';
import Reveal from './Reveal';
import { skills } from '../data';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

// Only map tools that have a reliable devicon asset — everything else
// gracefully falls back to a plain text chip (see TechIcon below).
const ICON_SLUG = {
  C: 'c/c-original',
  'C++': 'cplusplus/cplusplus-original',
  Python: 'python/python-original',
  Java: 'java/java-original',
  JavaScript: 'javascript/javascript-original',
  Bash: 'bash/bash-original',
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

function TechIcon({ name }) {
  const slug = ICON_SLUG[name];
  const [failed, setFailed] = useState(!slug);

  if (failed) {
    return <span className="tech-chip tech-chip-text">{name}</span>;
  }

  return (
    <span className="tech-chip" data-cursor-hover>
      <img src={`${DEVICON}/${slug}.svg`} alt="" loading="lazy" onError={() => setFailed(true)} />
      <span>{name}</span>
    </span>
  );
}

export default function TechStack() {
  return (
    <section id="tech-stack" className="section tech-section">
      <Reveal className="section-head">
        <span className="eyebrow">// tech stack</span>
        <h2>What I reach for.</h2>
        <p>Systems programming down to agent orchestration — the full stack, both ways.</p>
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
