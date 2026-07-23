import { useEffect, useState } from 'react';

const TYPE_SPEED = 65;
const DELETE_SPEED = 40;
const HOLD_TIME = 1500;
const GAP_TIME = 350;

export default function TypingWord({ words, className = '' }) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState('typing'); // typing | holding | deleting | gap

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setText(words[0]);
      return undefined;
    }

    const current = words[wordIndex];
    let timeout;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase('holding'), HOLD_TIME);
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('deleting'), 0);
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), DELETE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase('gap'), GAP_TIME);
      }
    } else if (phase === 'gap') {
      setWordIndex((i) => (i + 1) % words.length);
      setPhase('typing');
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words]);

  return (
    <span className={`typing-word ${className}`}>
      <span className="typing-word-text">{text}</span>
      <span className="typing-cursor" aria-hidden="true" />
    </span>
  );
}
