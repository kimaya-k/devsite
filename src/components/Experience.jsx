import { useLayoutEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { experience } from '../data';

function handDrawnRoundedRect(x, y, w, h, r) {
  const jx = 4;
  const jy = 3;
  return [
    `M ${x + r} ${y - jy * 0.4}`,
    `L ${x + w - r} ${y + jy * 0.3}`,
    `Q ${x + w + jx} ${y}, ${x + w} ${y + r}`,
    `L ${x + w + jx * 0.3} ${y + h - r}`,
    `Q ${x + w} ${y + h + jy}, ${x + w - r} ${y + h}`,
    `L ${x + r} ${y + h - jy * 0.3}`,
    `Q ${x - jx} ${y + h}, ${x} ${y + h - r}`,
    `L ${x + jx * 0.4} ${y + r}`,
    `Q ${x} ${y - jy}, ${x + r} ${y}`,
    'Z',
  ].join(' ');
}

function ExperienceCard({ item, offset, cardRef }) {
  return (
    <div className={`exp-card-wrap exp-offset-${offset}`} ref={cardRef}>
      <div className="exp-card">
        <div className="exp-card-top">
          <span className="exp-card-logo" style={{ '--mark-color': item.mark.color }}>
            <img
              src={`${import.meta.env.BASE_URL}${item.mark.logo}`}
              alt=""
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
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
  const wrapRef = useRef(null);
  const headingBlockRef = useRef(null);
  const cardRefs = useRef([]);
  const [circleD, setCircleD] = useState('');
  const [leadD, setLeadD] = useState('');
  const [stringD, setStringD] = useState('');

  cardRefs.current = [];
  const setCardRef = (el) => {
    if (el) cardRefs.current.push(el);
  };

  useLayoutEffect(() => {
    function measure() {
      const wrap = wrapRef.current;
      const block = headingBlockRef.current;
      if (!wrap || !block) return;
      const wrapRect = wrap.getBoundingClientRect();
      const bRect = block.getBoundingClientRect();

      const padX = 22;
      const padY = 16;
      const x = bRect.left - wrapRect.left - padX;
      const y = bRect.top - wrapRect.top - padY;
      const w = bRect.width + padX * 2;
      const h = bRect.height + padY * 2;
      setCircleD(handDrawnRoundedRect(x, y, w, h, 26));

      const boxBottomX = x + w * 0.22;
      const boxBottomY = y + h;

      if (cardRefs.current[0]) {
        const r = cardRefs.current[0].getBoundingClientRect();
        const endX = r.left - wrapRect.left + Math.min(30, r.width * 0.15);
        const endY = r.top - wrapRect.top;

        // guarantee a visible drop even if the card sits close to the box
        const minGap = 40;
        const safeEndY = Math.max(endY, boxBottomY + minGap);
        const ctrlX = (boxBottomX + endX) / 2 - 24;
        const ctrlY = boxBottomY + (safeEndY - boxBottomY) * 0.55;

        setLeadD(`M ${boxBottomX} ${boxBottomY} Q ${ctrlX} ${ctrlY}, ${endX} ${safeEndY}`);
      }

      const cardPoints = cardRefs.current.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - wrapRect.left,
          y: r.top + r.height / 2 - wrapRect.top,
        };
      });

      if (cardPoints.length >= 2) {
        setStringD(cardPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' '));
      } else {
        setStringD('');
      }
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
    <section id="experience" className="section exp-section">
      <div className="exp-wrap" ref={wrapRef}>
        <svg className="exp-annotation-svg">
          <path d={stringD} className="exp-string-path" />
        </svg>

        <Reveal className="section-head">
          <div className="exp-heading-block" ref={headingBlockRef}>
            <h2 className="exp-heading">Experience</h2>
          </div>
        </Reveal>

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