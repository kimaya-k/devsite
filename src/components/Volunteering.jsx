import Reveal from './Reveal';
import { involvement } from '../data';

export default function Volunteering() {
  return (
    <section id="volunteering" className="section">
      <Reveal className="section-head">
        <h2>Leadership and Volunteering</h2>
        <p>I've been involving myself in a lot of things.</p>
      </Reveal>

      <div className="involvement-list">
        {involvement.map((item, index) => (
          <Reveal as="div" delay={index * 0.06} key={item.role} className="involvement-item">
            <h3>{item.role}</h3>
            <span className="involvement-org">{item.org} · {item.date}</span>
            <p>{item.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
