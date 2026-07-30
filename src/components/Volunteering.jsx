import Reveal from './Reveal';
import { involvement } from '../data';

export default function Volunteering() {
  return (
    <section id="volunteering" className="section">
      <Reveal className="section-head">
        <h2>Leadership and Volunteering</h2>
        <p>I've been involved in a lot of things.</p>
      </Reveal>

      <div className="involvement-list">
        {involvement.map((item, index) => (
          <Reveal as="div" delay={index * 0.06} key={item.role} className="involvement-row-wrap">
            <div className="involvement-row">
              <div className="involvement-heading">
                <span className="involvement-index">{String(index + 1).padStart(2, '0')}</span>
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