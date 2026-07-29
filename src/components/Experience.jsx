import { useRef, useState } from 'react';
import Reveal from './Reveal';
import { experience } from '../data';

function CarSilhouette() {
  return (
    <svg viewBox="0 0 120 40" className="exp-car-svg" aria-hidden="true">
      <path d="M8 28 L18 28 L24 18 L46 14 L58 14 L66 20 L96 20 L104 26 L104 30 L96 30 L92 34 L80 34 L76 30 L46 30 L42 34 L30 34 L26 30 L8 30 Z" />
      <circle cx="32" cy="34" r="5" />
      <circle cx="86" cy="34" r="5" />
    </svg>
  );
}

function ExperienceCard({ item, index }) {
  return (
    <Reveal as="div" delay={index * 0.06} className="exp-card-wrap">
      <div className="exp-card">
        <div className="exp-card-top">
          <span className="exp-card-logo" style={{ '--mark-color': item.mark.color }}>
            {item.mark.domain ? (
              <img
                src={`https://logo.clearbit.com/${item.mark.domain}?size=88`}
                alt=""
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
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
    </Reveal>
  );
}

export default function Experience() {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <section id="experience" className="section">
      <Reveal className="section-head">
        <h2>Experience</h2>
        <p>My journey has only just begun.</p>
      </Reveal>

      <div className="exp-string-track">
        <div className="exp-string-line" />
        <div className="exp-string-fill" style={{ width: `${progress * 100}%` }} />
        <div className="exp-car" style={{ left: `${progress * 100}%` }}>
          <CarSilhouette />
        </div>
      </div>

      <div className="exp-scroll" ref={scrollRef} onScroll={handleScroll}>
        <div className="exp-row">
          {experience.map((item, index) => (
            <ExperienceCard item={item} index={index} key={item.org} />
          ))}
        </div>
      </div>
    </section>
  );
}