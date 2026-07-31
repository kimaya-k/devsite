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
    label: 'GitHub — Personal',
    value: '@kimaya-k',
    href: profile.github,
    kind: 'link',
    glyph: '{ }',
  },
  {
    label: 'GitHub — Purdue',
    value: '@deshpank',
    href: profile.purdueGithub,
    kind: 'link',
    glyph: '{ }',
  },
  {
    label: 'Email — Personal',
    value: profile.personalEmail,
    href: `mailto:${profile.personalEmail}`,
    kind: 'copy',
    copyText: profile.personalEmail,
    glyph: '@',
  },
  {
    label: 'Email — Purdue',
    value: profile.email,
    href: `mailto:${profile.email}`,
    kind: 'copy',
    copyText: profile.email,
    glyph: '@',
  },
];

function ContactCard({ item, index }) {
  const [copied, setCopied] = useState(false);

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
    <Reveal as="div" delay={index * 0.06} y={20}>
      <motion.a
        href={item.href}
        target={item.kind === 'link' ? '_blank' : undefined}
        rel={item.kind === 'link' ? 'noreferrer' : undefined}
        onClick={handleClick}
        className="contact-card"
        data-cursor-hover
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <span className="contact-card-glyph" aria-hidden="true">{item.glyph}</span>
        <span className="contact-card-body">
          <span className="contact-card-label">{item.label}</span>
          <span className="contact-card-value">{item.value}</span>
        </span>
        <span className="contact-card-action">
          {item.kind === 'copy' ? (copied ? 'copied ✓' : 'click to copy') : 'visit ↗'}
        </span>
      </motion.a>
    </Reveal>
  );
}

export default function Contact() {
  return (
    <>
      <section id="contact" className="section contact">
        <Reveal delay={0.05}>
          <h2 className="section-heading-accent">Reach Out!</h2>
          <p className="contact-byline">I promise my inbox has lower latency than my code.</p>
        </Reveal>

        <div className="contact-grid">
          {CONTACT_LINKS.map((item, index) => (
            <ContactCard item={item} index={index} key={item.label} />
          ))}
        </div>
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