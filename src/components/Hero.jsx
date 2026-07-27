import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Magnetic from './Magnetic';
import RotatingWord from './RotatingWord';
import AudioRing from './AudioRing';
import { useSong } from '../audio/useSong';
import { heroPhrases, heroBio } from '../data';

function ProfilePhoto() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="ring-photo-fallback" aria-hidden="true">
        KD
      </div>
    );
  }

  return (
    <img
      className="ring-photo"
      src="/profile.jpg"
      alt="Kimaya Deshpande"
      onError={() => setFailed(true)}
    />
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const { isPlaying, toggle, getLevels } = useSong();

  return (
    <header id="top" className="hero hero-intro" ref={heroRef}>
      <motion.div className="hero-intro-inner" style={{ opacity: fade }}>
        <motion.span
          className="hero-intro-eyebrow eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Software Engineer · Purdue CS '27
        </motion.span>

        <motion.div
          className="ring-stage"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <AudioRing getLevels={getLevels} isPlaying={isPlaying} size={340} />
          <div className="ring-content">
            <h1 className="hero-headline-ring">
              Building things <RotatingWord words={heroPhrases} />
            </h1>
            <span className="ring-name">Kimaya Deshpande</span>
            <div className="ring-photo-wrap">
              <ProfilePhoto />
            </div>
            <button
              type="button"
              className="ring-play-btn"
              onClick={toggle}
              data-cursor-hover
            >
              {isPlaying ? 'Stop' : 'Play'}
            </button>
          </div>
        </motion.div>

        <motion.p
          className="hero-bio"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.55 }}
        >
          {heroBio}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.7 }}
        >
          <Magnetic as="a" href="#projects" className="btn btn-primary">View projects</Magnetic>
          <Magnetic as="a" href="#contact" className="btn btn-ghost">Get in touch</Magnetic>
        </motion.div>
      </motion.div>

      <motion.div className="hero-scroll" style={{ opacity: fade }}>
        <span className="hero-scroll-line" />
        scroll
      </motion.div>
    </header>
  );
}
