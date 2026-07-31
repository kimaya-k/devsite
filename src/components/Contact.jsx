import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { profile } from '../data';

const STEPS = [
  { type: 'command', text: 'whoami' },
  { type: 'output', text: `${profile.name} — CS @ Purdue, building AI systems for healthcare & privacy.` },
  { type: 'command', text: 'open --linkedin' },
  { type: 'link', label: 'linkedin.com/in/kimaya-deshpande', href: profile.linkedin },
  { type: 'command', text: 'open --github personal' },
  { type: 'link', label: 'github.com/kimaya-k', href: profile.github },
  { type: 'command', text: 'open --github purdue' },
  { type: 'link', label: 'github.com/deshpank', href: profile.purdueGithub },
  { type: 'command', text: 'echo $EMAIL_PERSONAL' },
  { type: 'copy', label: profile.personalEmail, value: profile.personalEmail },
  { type: 'command', text: 'echo $EMAIL_PURDUE' },
  { type: 'copy', label: profile.email, value: profile.email },
];

function CopyLine({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  };

  return (
    <button type="button" className="term-line term-resolved" onClick={handleClick} data-cursor-hover>
      <span className="term-arrow">→</span> {label}
      <span className="term-hint">{copied ? 'copied ✓' : 'click to copy'}</span>
    </button>
  );
}

function LinkLine({ label, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="term-line term-resolved" data-cursor-hover>
      <span className="term-arrow">→</span> {label}
      <span className="term-hint">visit ↗</span>
    </a>
  );
}

export default function Contact() {
  const stageRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [done, setDone] = useState(false);

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
    if (!started || done) return;
    if (stepIndex >= STEPS.length) {
      setDone(true);
      return;
    }

    const step = STEPS[stepIndex];

    if (step.type === 'command') {
      if (typedChars < step.text.length) {
        const t = setTimeout(() => setTypedChars((c) => c + 1), 26);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setStepIndex((i) => i + 1);
        setTypedChars(0);
      }, 260);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setStepIndex((i) => i + 1), 340);
    return () => clearTimeout(t);
  }, [started, stepIndex, typedChars, done]);

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
            {STEPS.map((step, i) => {
              if (i > stepIndex) return null;
              const isCurrent = i === stepIndex && !done;

              if (step.type === 'command') {
                const text = isCurrent ? step.text.slice(0, typedChars) : step.text;
                return (
                  <div className="term-line term-command" key={i}>
                    <span className="term-prompt">$</span> {text}
                    {isCurrent && <span className="term-cursor" />}
                  </div>
                );
              }

              if (step.type === 'output') {
                return (
                  <motion.div
                    className="term-line term-output"
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.text}
                  </motion.div>
                );
              }

              if (step.type === 'link') {
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <LinkLine label={step.label} href={step.href} />
                  </motion.div>
                );
              }

              return (
                <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <CopyLine label={step.label} value={step.value} />
                </motion.div>
              );
            })}

            {done && (
              <div className="term-line term-command">
                <span className="term-prompt">$</span> <span className="term-cursor" />
              </div>
            )}
          </div>
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