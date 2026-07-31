import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { profile } from '../data';

const CONTACT_LINKS = [
  {
    label: 'LinkedIn',
    value: 'kimaya-deshpande',
    href: profile.linkedin,
    kind: 'link',
    glyph: 'in',
  },
  {
    label: 'GitHub (personal)',
    value: '@kimaya-k',
    href: profile.github,
    kind: 'link',
    glyph: '{ }',
  },
  {
    label: 'GitHub (Purdue)',
    value: '@deshpank',
    href: profile.purdueGithub,
    kind: 'link',
    glyph: '{ }',
  },
  {
    label: 'Personal email',
    value: profile.personalEmail,
    href: `mailto:${profile.personalEmail}`,
    kind: 'copy',
    copyText: profile.personalEmail,
    glyph: '@',
  },
  {
    label: 'Purdue email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    kind: 'copy',
    copyText: profile.email,
    glyph: '@',
  },
];

function OrbitItem({ item, angle, total }) {
  const [copied, setCopied] = useState(false);
  const radius = total > 4 ? 210 : 190;

  const handleClick = async (e) => {
    if (item.kind !== 'copy') return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(item.copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = item.href;
    }
  };

  return (
    <div
      className="orbit-slot"
      style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)` }}
    >
      <div className="orbit-counter">
        <motion.a
          href={item.href}
          target={item.kind === 'link' ? '_blank' : undefined}
          rel={item.kind === 'link' ? 'noreferrer' : undefined}
          onClick={handleClick}
          className="orbit-item"
          data-cursor-hover
          whileHover={{ scale: 1.18 }}
          transition={{ type: 'spring', stiffness: 320, damping: 16 }}
        >
          <span className="orbit-item-glyph">{item.glyph}</span>
        </motion.a>
        <span className="orbit-item-caption">
          {copied ? 'copied ✓' : item.value}
        </span>
      </div>
    </div>
  );
}

export default function Contact() {
  const total = CONTACT_LINKS.length;

  return (
    <>
      <section id="contact" className="section contact">
        <Reveal delay={0.05}>
          <h2 className="section-heading-accent">Reach Out!</h2>
          <p className="contact-byline">I promise my inbox has lower latency than my code.</p>
        </Reveal>

        <Reveal delay={0.2} className="orbit-stage">
          <svg className="orbit-track-svg" viewBox="0 0 500 500">
            <circle cx="250" cy="250" r="205" className="orbit-track-circle" />
          </svg>

          <div className="orbit-center">
            <span className="orbit-center-pulse" />
            <span className="orbit-center-label">say hi</span>
          </div>

          <div className="orbit-ring">
            {CONTACT_LINKS.map((item, i) => (
              <OrbitItem
                item={item}
                angle={(360 / total) * i}
                total={total}
                key={item.label}
              />
            ))}
          </div>
        </Reveal>

        <p className="contact-hint">click a GitHub or LinkedIn to visit · click an email to copy it</p>
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