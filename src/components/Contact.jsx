import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { profile } from '../data';

const COMMAND = 'cat contact';

const ENTRIES = [
  { perms: 'lrwxrwxrwx', name: 'linkedin', kind: 'link', href: profile.linkedin },
  { perms: 'lrwxrwxrwx', name: 'github-main', kind: 'link', href: profile.purdueGithub },
  { perms: 'lrwxrwxrwx', name: 'github-personal', kind: 'link', href: profile.github },
  { perms: '-rw-r--r--', name: 'email-personal', kind: 'copy', value: profile.personalEmail },
  { perms: '-rw-r--r--', name: 'email-purdue', kind: 'copy', value: profile.email },
];

function EntryRow({ entry, index }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (e) => {
    if (entry.kind !== 'copy') return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(entry.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${entry.value}`;
    }
  };

  const Tag = entry.kind === 'link' ? 'a' : 'button';
  const extraProps =
    entry.kind === 'link'
      ? { href: entry.href, target: '_blank', rel: 'noreferrer' }
      : { type: 'button', onClick: handleClick };

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, delay: index * 0.08 }}
    >
      <Tag className="term-ls-row" data-cursor-hover {...extraProps}>
        <span className="term-ls-perms">{entry.perms}</span>
        <span className="term-ls-name">{entry.name}</span>
        <span className="term-ls-hint">
          {entry.kind === 'link' ? 'visit ↗' : copied ? 'copied ✓' : 'click to copy'}
        </span>
      </Tag>
    </motion.div>
  );
}

export default function Contact() {
  const stageRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [showEntries, setShowEntries] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (typedChars < COMMAND.length) {
      const t = setTimeout(() => setTypedChars((c) => c + 1), 45);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowEntries(true), 300);
    return () => clearTimeout(t);
  }, [started, typedChars]);

  return (
    <>
      <section id="contact" className="section contact">
        <Reveal delay={0.05}>
          <h2 className="section-heading-accent">Reach Out!</h2>
          <p className="contact-byline">I promise my inbox has lower latency than my code.</p>
        </Reveal>

        <Reveal delay={0.15} className="term-window" y={24}>
          <div className="term-titlebar">
            <span className="term-dot term-dot-red" />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
            <span className="term-titlebar-label">kimaya@portfolio: ~/contact</span>
          </div>

          <div className="term-body" ref={stageRef}>
            <div className="term-line term-command">
              <span className="term-prompt">$</span> {COMMAND.slice(0, typedChars)}
              {!showEntries && <span className="term-cursor" />}
            </div>

            {showEntries && (
              <div className="term-ls-block">
                {ENTRIES.map((entry, i) => (
                  <EntryRow entry={entry} index={i} key={entry.name} />
                ))}
                <div className="term-line term-command term-final">
                  <span className="term-prompt">$</span> <span className="term-cursor" />
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <span>{profile.name} · {profile.location}</span>
        <span className="footer-rights">Kimaya's Portfolio 2026 © All Rights Reserved</span>
      </footer>
    </>
  );
}