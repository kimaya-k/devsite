import { useLayoutEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { experience } from '../data';

function handDrawnEllipse(cx, cy, rx, ry) {
  const rx1 = rx * 1.06;
  const ry1 = ry * 0.94;
  const rx2 = rx * 0.95;
  const ry2 = ry * 1.07;
  return [
    `M ${cx - rx1} ${cy}`,
    `C ${cx - rx1} ${cy - ry2 * 1.35}, ${cx - rx2 * 0.4} ${cy - ry1 * 1.4}, ${cx} ${cy - ry1}`,
    `C ${cx + rx2 * 0.5} ${cy - ry1 * 1.35}, ${cx + rx1} ${cy - ry2 * 1.3}, ${cx + rx1} ${cy}`,
    `C ${cx + rx1} ${cy + ry2 * 1.3}, ${cx + rx2 * 0.45} ${cy + ry1 * 1.4}, ${cx - rx2 * 0.05} ${cy + ry1 * 1.02}`,
    `C ${cx - rx2 * 0.55} ${cy + ry1 * 1.32}, ${cx - rx1} ${cy + ry2 * 1.15}, ${cx - rx1} ${cy}`,
  ].join(' ');
}

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
  const wrapRef = useRef(null);
  const headingRef = useRef(null);
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
      const heading = headingRef.current;
      if (!wrap || !heading) return;
      const wrapRect = wrap.getBoundingClientRect();
      const hRect = heading.getBoundingClientRect();

      const hCx = hRect.left + hRect.width / 2 - wrapRect.left;
      const hCy = hRect.top + hRect.height / 2 - wrapRect.top;
      const hRx = hRect.width / 2 + 26;
      const hRy = hRect.height / 2 + 20;
      setCircleD(handDrawnEllipse(hCx, hCy, hRx, hRy));

      const cardPoints = cardRefs.current.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - wrapRect.left,
          y: r.top + r.height / 2 - wrapRect.top,
          top: r.top - wrapRect.top,
        };
      });

      if (cardPoints.length > 0) {
        const first = cardPoints[0];
        const startX = hCx - hRx * 0.15;
        const startY = hCy + hRy * 1.3;
        const endX = first.x - 20;
        const endY = first.top;
        const ctrl1X = startX - 30;
        const ctrl1Y = startY + (endY - startY) * 0.4;
        const ctrl2X = endX + 40;
        const ctrl2Y = endY - (endY - startY) * 0.25;
        setLeadD(`M ${startX} ${startY} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${endX} ${endY}`);
      }

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
    <section id="experience" className="section">
      <div className="exp-wrap" ref={wrapRef}>
        <svg className="exp-annotation-svg">
          <path d={circleD} className="exp-annotation-path" />
          <path d={leadD} className="exp-annotation-path exp-annotation-lead" />
          <path d={stringD} className="exp-string-path" />
        </svg>

        <Reveal className="section-head">
          <h2 className="exp-heading" ref={headingRef}>Experiences.</h2>
          <p>My journey has only just begun.</p>
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