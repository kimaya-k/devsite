import Reveal from './Reveal';
import { profile } from '../data';

export default function Contact() {
  return (
    <>
      <section id="contact" className="section contact">
        <Reveal className="eyebrow">Contact</Reveal>
        <Reveal delay={0.1}>
          <h2>Let's build something that matters.</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </Reveal>
      </section>
      <footer className="footer">
        <span>{profile.name} · {profile.location}</span>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </footer>
    </>
  );
}
