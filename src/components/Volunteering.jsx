import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import { involvement } from '../data';

function InvolvementMark({ mark }) {
  const [failed, setFailed] = useState(false);
  if (failed || !mark) {
    return (
      <span className="involvement-mark" style={{ '--mark-color': mark?.color }}>
        {mark?.text ?? '—'}
      </span>
    );
  }
  return (
    <span className="involvement-mark involvement-mark-logo">
      <img
        src={`${import.meta.env.BASE_URL}${mark.logo}`}
        alt=""
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function InvolvementRow({ item, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [4, -4]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-160, 160], [-3, 3]), { stiffness: 220, damping: 22 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Reveal as="div" delay={index * 0.06} className="involvement-row-wrap">
      <motion.div
        ref={ref}
        className="involvement-row"
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-cursor-hover
      >
        <div className="involvement-heading">
          <InvolvementMark mark={item.mark} />
          <div>
            <h3>{item.role}</h3>
            <span className="involvement-org">{item.org}</span>
          </div>
        </div>
        <p className="involvement-desc">{item.note}</p>
        <div className="involvement-meta">
          <span className="timeline-date">{item.date}</span>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Volunteering() {
  return (
    <section id="volunteering" className="section">
      <Reveal className="section-head">
        <h2 className="section-heading-accent">Leadership and Volunteering</h2>
        <p>I've been involved in a lot of things.</p>
      </Reveal>

      <div className="involvement-list">
        {involvement.map((item, index) => (
          <InvolvementRow item={item} index={index} key={item.role} />
        ))}
      </div>
    </section>
  );
}