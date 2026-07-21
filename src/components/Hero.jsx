import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <header id="top" className="hero">
      <motion.div
        className="hero-eyebrow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="dot" />
        <span className="eyebrow">Kimaya Deshpande — CS, Purdue '27</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
      >
        I build AI systems for the moments they <em>can't</em> get wrong.
      </motion.h1>

      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
      >
        Software engineer working across multi-agent architectures, healthcare AI, and
        LLM privacy research — from clinical pipelines at Humana to profiling-attack
        research in the lab.
      </motion.p>

      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
      >
        <a className="btn btn-primary" href="#projects">View projects</a>
        <a className="btn btn-ghost" href="#contact">Get in touch</a>
      </motion.div>

      <div className="hero-scroll">
        <span className="hero-scroll-line" />
        scroll
      </div>
    </header>
  );
}
