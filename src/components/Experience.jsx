import { useLayoutEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { experience } from '../data';

function ExperienceCard({ item, offset, cardRef }) {
  return (
    <div className={`exp-card-wrap exp-offset-${offset}`} ref={cardRef}>
      <div className="exp-card">
        <div className="exp-card-top">
          <span className="exp-card-logo" style={{ '--mark-color': item.mark.color }}>
            {item.mark.domain ? (
              <img
                src={`https://logo.clearbit.com/${item.mark.domain}?size=88`}
                alt=""
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              item.mark.text
            )}
          </span>
          <span className="exp-card-date">{item.date}</span>
        </div>

        <h3 className="exp-card-role">{item.role}</h3>
        <span className="exp-card-org">{item.org}</span>

        <ul className="exp-card-points">
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="exp-card-tags">
          {item.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [pathD, setPathD] = useState('');

  cardRefs.current = [];
  const setCardRef = (el) => {
    if (el) cardRefs.current.push(el);
  };

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();

      const points = cardRefs.current.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top,
        };
      });

      if (points.length < 2) {
        setPathD('');
        return;
      }

      setPathD(points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' '));
    }

    measure();
    window.addEventListener('resize', measure);
    const lateId = setTimeout(measure, 350);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(lateId);
    };
  }, []);

  return (
    <section id="experience" className="section">
      <Reveal className="section-head">
        <span className="eyebrow">Experience</span>
        <h2>Experiences.</h2>
        <p>My journey has only just begun.</p>
      </Reveal>

      <div className="exp-zigzag" ref={containerRef}>
        <svg className="exp-string-svg">
          <path d={pathD} className="exp-string-path" />
        </svg>

        <div className="exp-zigzag-row">
          {experience.map((item, index) => (
            <ExperienceCard
              item={item}
              offset={index % 2 === 0 ? 'up' : 'down'}
              cardRef={setCardRef}
              key={item.org}
            />
          ))}
        </div>
      </div>
    </section>
  );
}