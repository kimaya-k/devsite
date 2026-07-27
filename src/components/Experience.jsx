import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Reveal from './Reveal';
import { experience } from '../data';

function LogoMark({ mark }) {
  const [failed, setFailed] = useState(false);

  if (failed || !mark.domain) {
    return (
      <span
        className="timeline-mark"
        style={{ '--mark-color': mark.color }}
        aria-hidden="true"
      >
        {mark.text}
      </span>
    );
  }

  return (
    <span className="timeline-mark timeline-mark-logo" aria-hidden="true">
      <img
        src={`https://logo.clearbit.com/${mark.domain}?size=88`}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  return (
    <Reveal as="div" delay={index * 0.05} className="timeline-item" y={16}>
      <span ref={ref} className="timeline-node" />
      <div className="timeline-item-inner">
        <LogoMark mark={item.mark} />
        <div className="timeline-item-body">
          <div className="timeline-item-head">
            <div>
              <span className="timeline-role">{item.role}</span>
              {' '}
              <span className="timeline-org">— {item.org}</span>
            </div>
            <span className="timeline-date">{item.date}</span>
          </div>
          <ul className="timeline-points">
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="timeline-tags">
            {item.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Experience() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.8', 'end 0.6'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="experience" className="section">
      <Reveal className="section-head">
        <span className="eyebrow">Experience</span>
        <h2>A pipeline, in reverse chronology.</h2>
        <p>Five roles, one thread: agents and pipelines built to handle data that matters.</p>
      </Reveal>

      <div className="timeline" ref={trackRef}>
        <div className="timeline-track" />
        <motion.div className="timeline-progress" style={{ scaleY: progress, height: '100%' }} />
        {experience.map((item, index) => (
          <TimelineItem item={item} index={index} key={item.org} />
        ))}
      </div>
    </section>
  );
}
