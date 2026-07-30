import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Magnetic from './Magnetic';
import TypingWord from './TypingWord';
import PhotoRing from './PhotoRing';
import AudioRing from './AudioRing';
import { useSong } from '../audio/useSong';
import { heroPhrases, heroBio } from '../data';

const HIGHLIGHT_WORDS = ['CS', 'software', 'applications', 'AI', 'healthcare', 'education', 'community', 'world', 'impact', 'developing', 'Humana', 'CATME', 'Purdue'];
const HIGHLIGHT_PATTERN = new RegExp(`\\b(${HIGHLIGHT_WORDS.join('|')})\\b`, 'g');

function renderHighlightedBio(text) {
  const parts = text.split(HIGHLIGHT_PATTERN);
  return parts.map((part, i) =>
    HIGHLIGHT_WORDS.includes(part) ? (
      <span className="bio-highlight" key={i}>{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const { isPlaying, toggle, getLevels } = useSong();

  return (
    <header id="top" className="hero hero-centered" ref={heroRef}>
      <motion.div className="hero-centered-inner" style={{ opacity: fade }}>
        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          Building things
          <span className="hero-headline-line2">
            for <TypingWord words={heroPhrases} />
          </span>
        </motion.h1>

        <motion.div
          className="hero-photo-ring-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <AudioRing getLevels={getLevels} isPlaying={isPlaying} />
          <div className="hero-photo">
            <PhotoRing />
          </div>
        </motion.div>

        <button
          type="button"
          className="ring-play-btn"
          onClick={toggle}
          data-cursor-hover
        >
          {isPlaying ? 'Stop' : 'Play my_song.js'}
        </button>

        <motion.p
          className="hero-bio"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
        >
          {renderHighlightedBio(heroBio)}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.68 }}
        >
          <Magnetic as="a" href="#projects" className="btn btn-primary">View projects</Magnetic>
          <Magnetic as="a" href="#contact" className="btn btn-ghost">Get in touch</Magnetic>
        </motion.div>

        <motion.p
          className="hero-aside"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
        </motion.p>
      </motion.div>
    </header>
  );
}