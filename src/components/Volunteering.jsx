import { useState } from 'react';
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

export default function Volunteering() {
  return (
    <section id="volunteering" className="section">
      <Reveal className="section-head">
         <h2 className="section-heading-accent">Leadership and Volunteering</h2>
        <p>I've been involved in a lot of things.</p>
      </Reveal>

      <div className="involvement-list">
        {involvement.map((item, index) => (
          <Reveal as="div" delay={index * 0.06} key={item.role} className="involvement-row-wrap">
            <div className="involvement-row">
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
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}