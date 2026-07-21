import Reveal from './Reveal';
import { skills } from '../data';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <Reveal className="section-head">
        <span className="eyebrow">Skills</span>
        <h2>The toolkit.</h2>
      </Reveal>

      <div className="skills-grid">
        {skills.map((group, index) => (
          <Reveal as="div" delay={index * 0.06} key={group.label} className="skill-group">
            <h3>{group.label}</h3>
            <div className="skill-chips">
              {group.items.map((item) => (
                <span className="chip" key={item}>{item}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
