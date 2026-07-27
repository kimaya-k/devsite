import Reveal from './Reveal';
import { profile, stats } from '../data';

export default function About() {
  return (
    <section id="about" className="section">
      <Reveal className="section-head">
        <span className="eyebrow">// about</span>
        <h2>Obsessed with data that matters.</h2>
      </Reveal>

      <div className="about-grid">
        <Reveal delay={0.1} className="about-body">
          <p>
            I'm <strong>Kimaya</strong> — a computer science student at Purdue, minoring
            in math, with a habit of gravitating toward problems where the stakes are
            personal: clinical measures, health data, insurance claims, people's own
            digital footprints. Most of my work lives at the intersection of AI agents
            and the systems that have to handle sensitive information responsibly.
          </p>
          <p>
            That's shown up as a multi-hop pipeline for clinical evaluation at{' '}
            <strong>Humana</strong>, an LLM-agent framework studying privacy leakage
            under <strong>Tech Justice Lab</strong>, and a couple of hackathon builds
            that turned "automate this" into working multi-agent software in under 48
            hours. Underneath all of it, I like being the person who can go from a
            systems-level bug to a production feature and back again.
          </p>

          <dl className="about-facts">
            <div className="about-fact">
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div className="about-fact">
              <dt>Studying</dt>
              <dd>B.S. Computer Science, Math minor — {profile.school}</dd>
            </div>
            <div className="about-fact">
              <dt>Focus</dt>
              <dd>AI agents, backend systems, LLM privacy</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.2} className="about-stats">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
