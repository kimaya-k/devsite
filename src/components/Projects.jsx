import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import { projects } from '../data';

const F = 0.1;

function bumpSegment(start, end, axis, outwardSign, type) {
  if (type === 'flat') return `L ${end.x} ${end.y}`;
  const dir = (type === 'tab' ? 1 : -1) * outwardSign;
  const depth = dir * F;
  const neck = 0.05;
  const knob = 0.05;

  if (axis === 'y') {
    const y0 = start.y;
    const mx = (start.x + end.x) / 2;
    const s = end.x > start.x ? 1 : -1;
    return [
      `L ${mx - s * (neck + knob)} ${y0}`,
      `C ${mx - s * neck} ${y0} ${mx - s * knob} ${y0 + depth * 0.6} ${mx - s * knob} ${y0 + depth}`,
      `C ${mx - s * knob} ${y0 + depth * 1.4} ${mx + s * knob} ${y0 + depth * 1.4} ${mx + s * knob} ${y0 + depth}`,
      `C ${mx + s * knob} ${y0 + depth * 0.6} ${mx + s * neck} ${y0} ${mx + s * (neck + knob)} ${y0}`,
      `L ${end.x} ${end.y}`,
    ].join(' ');
  }

  const x0 = start.x;
  const my = (start.y + end.y) / 2;
  const s = end.y > start.y ? 1 : -1;
  return [
    `L ${x0} ${my - s * (neck + knob)}`,
    `C ${x0} ${my - s * neck} ${x0 + depth * 0.6} ${my - s * knob} ${x0 + depth} ${my - s * knob}`,
    `C ${x0 + depth * 1.4} ${my - s * knob} ${x0 + depth * 1.4} ${my + s * knob} ${x0 + depth} ${my + s * knob}`,
    `C ${x0 + depth * 0.6} ${my + s * knob} ${x0} ${my + s * neck} ${x0} ${my + s * (neck + knob)}`,
    `L ${end.x} ${end.y}`,
  ].join(' ');
}

function buildPuzzlePath(edges) {
  const TL = { x: F, y: F };
  const TR = { x: 1 - F, y: F };
  const BR = { x: 1 - F, y: 1 - F };
  const BL = { x: F, y: 1 - F };
  return [
    `M ${TL.x} ${TL.y}`,
    bumpSegment(TL, TR, 'y', -1, edges.top),
    bumpSegment(TR, BR, 'x', 1, edges.right),
    bumpSegment(BR, BL, 'y', 1, edges.bottom),
    bumpSegment(BL, TL, 'x', -1, edges.left),
    'Z',
  ].join(' ');
}

// Track the actual rendered column count, matching the CSS grid breakpoints
function useColumns() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w <= 560) setCols(1);
      else if (w <= 1000) setCols(2);
      else setCols(4);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cols;
}

function computeEdges(r, c, cols, rows) {
  const edges = { top: 'flat', right: 'flat', bottom: 'flat', left: 'flat' };
  if (c > 0) edges.left = (r + c - 1) % 2 === 0 ? 'blank' : 'tab';
  if (c < cols - 1) edges.right = (r + c) % 2 === 0 ? 'tab' : 'blank';
  if (r > 0) edges.top = c % 2 === 0 ? 'blank' : 'tab';
  if (r < rows - 1) edges.bottom = c % 2 === 0 ? 'tab' : 'blank';
  return edges;
}

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

function ProjectCard({ project, index, cols, rows, plain }) {
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
  const r = Math.floor(index / cols);
  const c = index % cols;
  const clipId = `piece-clip-${index}`;
  const clipUrl = plain ? undefined : `url(#${clipId})`;

  return (
    <div className="project-card-wrap">
      <div
        className="project-card-shape"
        style={plain ? undefined : { clipPath: clipUrl, WebkitClipPath: clipUrl }}
      >
        {!plain && (
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
            <defs>
              <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                <path d={buildPuzzlePath(computeEdges(r, c, cols, rows))} />
              </clipPath>
            </defs>
          </svg>
        )}

        <Reveal as="div" delay={index * 0.05} className="project-card-reveal">
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
      </div>
    </div>
  );
}

export default function Projects() {
  const cols = useColumns();
  const rows = Math.ceil(projects.length / cols);
  const plain = cols === 1;

  return (
    <section id="projects" className="section">
      <Reveal className="section-head">
        <h2 className="section-heading-accent">Projects</h2>
        <p>Projects to project my success.</p>
      </Reveal>

      <div className={`project-grid project-grid-puzzle ${plain ? 'project-grid-plain' : ''}`}>
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} cols={cols} rows={rows} plain={plain} key={project.name} />
        ))}
      </div>
    </section>
  );
}